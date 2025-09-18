const express = require('express');
const uniqid = require('uniqid');
const fs = require('fs');
const app = express();

app.use(express.json());
app.get('/product', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    const convertData = JSON.parse(data);
    return res.status(200).json(convertData);
  });
});
app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('data.json', 'utf-8', (err, data) => {
    const convertData = JSON.parse(data);

    const arData = convertData.filter(item => {
      return item.id == id;
    });
    return res.status(200).json(arData);
  });
});

app.post('/product', (req, res) => {
  const { body } = req;
  fs.readFile('data.json', 'utf-8', (err, data) => {
    const arData = JSON.parse(data);
    arData.push({ ...body, id: uniqid() });
    const jsonData = JSON.stringify(arData);
    fs.writeFile('data.json', jsonData, 'utf-8', err => {
      return res.status(200).json({ message: 'product Added' });
    });
  });
});

app.delete('/product/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('data.json', 'utf-8', (err, data) => {
    const arData = JSON.parse(data);
    const index = arData.findIndex(item => {
      return item.id == id;
    });

    arData.splice(index, 1);
    const jsonData = JSON.stringify(arData);

    fs.writeFile('data.json', jsonData, 'utf-8', err => {
      return res.status(200).json({ message: 'product deleted' });
    });
  });
});

app.patch('/product/:id', (req, res) => {
  const { id } = req.params;

  const { Product, price } = req.body;

  fs.readFile('data.json', 'utf-8', (err, data) => {
    const arData = JSON.parse(data);

    for (let i of arData) {
      if (i.id == id) {
        if (Product) i.Product = Product;
        if (price) i.price = price;
      }
    }

    const jsonData = JSON.stringify(arData);
    fs.writeFile('data.json', jsonData, 'utf-8', err => {
      res.status(201).json({ product: 'product Updated' });
    });
  });
});

app.listen(8000, () => {
  console.log('app is running');
});
