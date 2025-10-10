const express = require('express');

const Book = require('../db/models/book-schema');
const router = express.Router();

router.get('/book', async (req, res) => {
  const dbResponse = await Book.find();
  return res.status(200).json(dbResponse);
});
router.post('/book', async (req, res) => {
  const { body } = req;
  const dbResponse = await Book.create(body);

  return res.status(200).json(dbResponse);
});


router.get('/book/:id', async (req, res) => {
  try{
  const { id } = req.params;
  const dbResponse = await Book.findById(id);
  return res.status(200).json(dbResponse);
  }
  catch{
    return res.status(500).json({message:e.mesage,error:true})
  }
});

router.delete('/book/:id', async (req, res) => {
  try{
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  return res.status(200).json({message:"item Deleted"});
  }
  catch{
    return res.status(500).json({message:e.mesage,error:true})
  }
});

router.patch('/book/:id', async (req, res) => {
  try{
  const { id } = req.params;
  const {body}=req;
  const dbResponse = await Book.findByIdAndUpdate(id,body);
  return res.status(200).json({message:"item updated",dbResponse});
  }
  catch{
    return res.status(500).json({message:e.mesage,error:true})
  }
});

module.exports = router;
