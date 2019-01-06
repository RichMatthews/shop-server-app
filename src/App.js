const express = require('express')
var jsonServer = require('json-server')
const app = express()
const port = 3004
const cors = require('cors')
var bodyParser = require('body-parser')
const fs = require('fs')

app.listen(port, () => console.log(`SERVER BOOTED SUCCESS! Listening on port ${port}!`))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.options('*', cors())

app.get("/basket", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
    if (err) throw err;
     let dbData = JSON.parse(data);
     res.status(200).send(dbData.basket.products);
  });
})

app.get("/products/sport", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
    if (err) throw err;
     let dbData = JSON.parse(data);
     console.log(dbData.products.filter(product => product.id === "SPO-001")[0].coupons, 'db d123')
     res.status(200).send(dbData.products);
  });
})

app.post("/product/:productId/coupons", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
     if (err) throw err;
     let dbData = JSON.parse(data);
     console.log(req.body, 'reqqy')
     if(req.body.method === 'POST') {
       let foundProduct = dbData.basket.products.filter(product => product.id === req.params.productId)
       if (foundProduct[0].discounts.code.includes(req.body.code)) {
         dbData.basket.products.filter(product => product.id === req.params.productId)[0].price = foundProduct[0].discounts.amount
         foundProduct[0].discounts.active = true
       } else {
         console.log('error applying coupon')
       }
     }
     if (req.body.method === 'DELETE') {
       let foundProduct = dbData.basket.products.filter(product => product.id === req.params.productId)
       foundProduct[0].discounts.active = false
       dbData.basket.products.filter(product => product.id === req.params.productId)[0].price = foundProduct[0].basePrice
     }

     updatedJSONData = JSON.stringify(dbData)
     fs.writeFile('db.json', updatedJSONData, 'utf8', function(err, data) {
        if (err) throw err;
         res.status(200).send("Basket was updated");
     });
  });
})

app.post("/basket", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
     if (err) throw err;
     let dbData = JSON.parse(data);
     dbData.basket.products = req.body
     updatedJSONData = JSON.stringify(dbData)
     fs.writeFile('db.json', updatedJSONData, 'utf8', function(err, data) {
        if (err) throw err;
         res.status(200).send("Basket was updated");
     });
  });
})

app.get("/products", function(req, res) {
  fs.readFile('db.json', 'utf8', function (err, data) {
    if (err) throw err;
     let dbData = JSON.parse(data);
     res.status(200).send(dbData.products);
  });
})
