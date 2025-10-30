const express = require('express');
const CheckToken = require('../middleware/checkToken');
const multer = require('multer');
const uniqid = require('uniqid');
const Book = require('../db/models/book-schema');
const router = express.Router();

router.use(express.static('public'));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uniqid()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage })
// router.post('/upload-image', upload.single('img'), (req, res) => {
//   try{
//   const link = req.file.filename;
//   console.log(link);
//   res.status(201).json({
//     message: 'image Uploaded',
//     url: `http://localhost:8000/images/${link}`,
//   });}
//   catch (e) {
//     return res.status(500).json({ message: e.message, error: true });
//   }
//   });

// router.get('/book', CheckToken(['admin', 'user']), async (req, res) => {
//   try {
//     const dbResponse = await Book.find().populate('author');
//     return res.status(200).json(dbResponse);
//   } catch (e) {
//     return res.status(500).json({ message: e.message, error: true });
//   }
// });

router.get('/book', async (req, res) => {
  try {
    const {
      title,
      price,
      minprice,
      maxprice,
      sortby = 'title',
      sortorder = 'asc',
      page = 1,
      limit = 10,
    } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (price) query.price = price;
    else if (minprice && maxprice)
      query.price = { $gte: minprice, $lte: maxprice };
    else if (minprice) query.price = { $gte: minprice };
    else if (maxprice) query.price = { $lte: maxprice };
    const dbResponse = await Book.find(query)
      .sort({ [sortby]: sortorder })
      .limit(limit)
      .skip((page - 1) * limit);

    return res.status(200).json(dbResponse);
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});
router.post('/book', async (req, res) => {
  try {
    const { body } = req;
    const dbResponse = await Book.create(body);

    return res.status(200).json(dbResponse);
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

router.get('/book/:id', CheckToken, async (req, res) => {
  try {
    const { id } = req.params;
    const dbResponse = await Book.findById(id);
    return res.status(200).json(dbResponse);
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

router.delete('/book/:id', CheckToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    return res.status(200).json({ message: 'item Deleted' });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

router.patch('/book/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const dbResponse = await Book.findByIdAndUpdate(id, body, { new: true });
    return res.status(200).json({ message: 'item updated', dbResponse });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

module.exports = router;
