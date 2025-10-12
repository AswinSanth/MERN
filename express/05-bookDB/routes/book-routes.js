const express = require('express');

const Book = require('../db/models/book-schema');
const router = express.Router();

router.get('/book', async (req, res) => {
  try {
    const dbResponse = await Book.find();
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

router.get('/book/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dbResponse = await Book.findById(id);
    return res.status(200).json(dbResponse);
  } catch(e) {
    
    return res.status(500).json({ message: e.message, error: true });
  }
});

router.delete('/book/:id', async (req, res) => {
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
    const dbResponse = await Book.findByIdAndUpdate(id, body);
    return res.status(200).json({ message: 'item updated', dbResponse });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
});

module.exports = router;
