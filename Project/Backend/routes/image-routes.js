const express = require('express');
const multer = require('multer');
const uniqid = require('uniqid');
const router = express.Router();
const ImageKit = require('imagekit');
const fs = require('fs');
require('dotenv').config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${uniqid()}-${file.originalname}`);
//   },
// });
const storage=multer.memoryStorage()
const upload = multer({ storage: storage });

router.post('/product/imageUpload', upload.single('img'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // const fileData = fs.readFileSync(req.file.path);
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: '/products',
    });
    // fs.unlinkSync(req.file.path);
    res.status(201).json({
      message: 'Image Added',
      url: result.url,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

module.exports = router;
