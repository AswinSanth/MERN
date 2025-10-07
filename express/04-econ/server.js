const express = require('express');
const uniqid = require('uniqid');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const app = express();

app.use(cors());

app.use(express.static('public'));
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
    return res.status(200).json(arData[0]);
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

    const imageArr = arData[index].image.split('/');
    const actualImg = imageArr[imageArr.length - 1];

    fs.unlink(`public/images/${actualImg}`,
      err => {
        console.log(err);
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

  const { Product, price, image } = req.body;

  fs.readFile('data.json', 'utf-8', (err, data) => {
    const arData = JSON.parse(data);

    for (let i of arData) {
      if (i.id == id) {
        if (Product) i.Product = Product;
        if (price) i.price = price;
        if (image) i.image = image;
      }
    }

    const jsonData = JSON.stringify(arData);
    fs.writeFile('data.json', jsonData, 'utf-8', err => {
      res.status(201).json({ product: 'product Updated' });
    });
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${uniqid()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
app.post('/upload-image', upload.single('img'), (req, res) => {
  const link = req.file.filename;
  console.log(link);
  res.status(201).json({
    message: 'image Uploaded',
    url: `http://localhost:8000/images/${link}`,
  });
});

app.listen(8000, () => {
  console.log('app is running');
});
