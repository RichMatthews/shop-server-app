const express = require('express')
var jsonServer = require('json-server')
const app = express()
const port = 3004
const cors = require('cors')
app.use(cors())
app.options('*', cors())
var bodyParser = require('body-parser')
const fs = require('fs');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use('/api', jsonServer.router('db.json'));

app.get("/basket", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
    if (err) throw err;
     let dbData = JSON.parse(data);
     res.status(200).send(dbData.basket.products);
  });
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/basket", function(req, res) {
      fs.readFile('db.json', 'utf8', function (err, data) {
        console.log(req.body, 'req')
        if (err) throw err;
         let dbData = JSON.parse(data);
         dbData.basket.products = req.body
         updatedJSONData = JSON.stringify(dbData)
         fs.writeFile('db.json', updatedJSONData, 'utf8', function(err, data) {
            if (err) throw err;
             res.status(200).send("Basket was updated");
         } );

      });
    })

app.get("/products", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
    if (err) throw err;
     let dbData = JSON.parse(data);
     res.status(200).send(dbData.products);
  });
})
