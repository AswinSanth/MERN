const express = require('express');
const multer = require('multer');
const uniqid = require('uniqid');
const app = express();

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${uniqid()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
app.post('/upload-image', upload.array('img', 5), (req, res) => {
  console.log(req.files);
  const link = req.files.map(i => `http://localhost:8000/images/${i.filename}`);
  console.log(link);
  res.status(201).json({
    message: 'image Uploaded',
    url: link,
  });
});

app.listen(8000, () => {
  console.log('app i running');
});
