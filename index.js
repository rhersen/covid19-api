import axios from "axios";
import express from "express";
import xlsx from "xlsx";
import regions from "./src/regions.js";
import {addHours, isPast, parse} from "date-fns";

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

app.get("/json", async (req, res) => {
  try {
    if (cache.book && !isPast(cache.expires)) {
      console.log("FHM data cached until UTC:", cache.expires);
      res.send(cache.book);
    } else {
      res.send(await getBook());
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/cases", async (req, res) => {
  try {
    if (cache.book && !isPast(cache.expires)) {
      console.log("FHM data cached until UTC:", cache.expires);
      res.send(regions(cache.book));
    } else {
      const book = await getBook();
      res.send(regions(book));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`covid19-api app listening at http://localhost:${port}`);
});
