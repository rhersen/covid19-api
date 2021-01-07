import express from "express";
import axios from "axios";
const app = express()
const port = 3000

app.get('/', (req, res) => {
  axios.get('https://www.arcgis.com/sharing/rest/content/items/b5e7488e117749c19881cce45db13f7e/data', {
    responseType: 'arraybuffer',
  })
    .then(function({data, status, statusText}) {
      console.log('handle success', status, statusText, data.length, 'bytes')
      res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-disposition': 'attachment;filename=Folkhalsomyndigheten_Covid19.xlsx',
        'Content-Length': data.length
      });
      res.end(Buffer.from(data, 'binary'));
    })
    .catch(function(error) {
      console.log('handle error')
      console.log(error);
    })
})

app.listen(port, () => {
  console.log(`covid19-api app listening at http://localhost:${port}`)
})