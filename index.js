import axios from "axios";
import express from "express";
import xlsx from "xlsx";
import regions from "./src/regions.js";

const app = express();
const port = 3000;
const url =
  "https://www.arcgis.com/sharing/rest/content/items/b5e7488e117749c19881cce45db13f7e/data";

const respondWithJson = (res) => ({ data, status, statusText }) => {
  console.log(status, statusText, data.length, "bytes");
  let sheet = xlsx.read(data)?.Sheets?.["Antal per dag region"];
  res.send(regions(sheet));
};

const respondWithRegions = (res) => ({ data, status, statusText }) => {
  console.log(status, statusText, data.length, "bytes");
  let sheet = xlsx.read(data)?.Sheets?.["Antal per dag region"];
  res.send(regions(sheet));
};

const respondWithXlsx = (res) => ({ data }) => {
  res.writeHead(200, {
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-disposition":
      "attachment;filename=Folkhalsomyndigheten_Covid19.xlsx",
    "Content-Length": data.length,
  });
  res.end(Buffer.from(data, "binary"));
};

const handleError = (res) => (error) => {
  console.error(error);
  res.status(500).send(error.message);
};

app.get("/xlsx", (req, res) => {
  axios
    .get(url, { responseType: "arraybuffer" })
    .then(respondWithXlsx(res))
    .catch(handleError(res));
});

app.get("/json", (req, res) => {
  axios
    .get(url, { responseType: "arraybuffer" })
    .then(respondWithJson(res))
    .catch(handleError(res));
});

app.get("/cases", (req, res) => {
  axios
    .get(url, { responseType: "arraybuffer" })
    .then(respondWithRegions(res))
    .catch(handleError(res));
});

app.listen(port, () => {
  console.log(`covid19-api app listening at http://localhost:${port}`);
});
