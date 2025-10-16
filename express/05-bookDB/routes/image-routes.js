const express = require('express');
const multer = require('multer');
const uniqid = require('uniqid');
const router = express.Router();

router.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${uniqid()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
router.post('/upload-image', upload.single('img'), (req, res) => {
  try {
    const link = req.file.filename;
    console.log(link);
    res.status(201).json({
      message: 'image Uploaded',
      url: `http://localhost:8000/images/${link}`,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});
module.exports = router;
