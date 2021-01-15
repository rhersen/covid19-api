import axios from "axios";
import express from "express";
import xlsx from "xlsx";
import cases from "./src/cases.js";
import { addHours, isPast, parse } from "date-fns";
import deaths from "./src/deaths.js";

const app = express();
const port = 3000;
const url =
  "https://www.arcgis.com/sharing/rest/content/items/b5e7488e117749c19881cce45db13f7e/data";
const cache = {};

async function getBook() {
  const { data, status, statusText } = await axios.get(url, {
    responseType: "arraybuffer",
  });
  console.log(status, statusText, data.length, "bytes");
  const book = xlsx.read(data);
  let [, date] = /\w*\s*(.+)/.exec(book.SheetNames[book.SheetNames.length - 1]);
  let fileReleased = addHours(parse(date, "d MMM yyyy", new Date()), 14);
  cache.book = book;
  cache.expires = addHours(fileReleased, 23);
  return book;
}

app.get(
  "/json",
  handle((book) => book)
);

app.get("/cases", handle(cases));
app.get("/deaths", handle(deaths));

function handle(f) {
  return async (req, res) => {
    try {
      if (cache.book && !isPast(cache.expires)) {
        console.log("FHM data cached until UTC:", cache.expires);
        res.send(f(cache.book));
      } else {
        const book = await getBook();
        res.send(f(book));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };
}

app.listen(port, () => {
  console.log(`covid19-api app listening at http://localhost:${port}`);
});
