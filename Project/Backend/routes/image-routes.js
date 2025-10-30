const express = require('express');
const multer = require('multer');
const uniqid = require('uniqid');
const router = express.Router();

router.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, `${uniqid()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/product/imageUpload', upload.single('img'), (req, res) => {
  try {
    const link = req.file.filename;

    
    res.status(201).json({
      message: 'Image Added',
      url: `http://localhost:8000/images/${link}`,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

module.exports = router;
