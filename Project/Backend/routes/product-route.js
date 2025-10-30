const express = require('express');

const Product = require('../DB/models/product-schema');
const router = express.Router();

require('dotenv');
router
  .get('/product', async (req, res) => {
    try {
      const user = await Product.find();
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  })
  .post('/product/addProduct', async (req, res) => {
    try {
      const { body } = req;

      console.log(body);
      const dbResponse = await Product.create(body);
      return res.status(200).json({ message: 'product addded', dbResponse });
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  })
  .delete('/product/deleteProduct/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const dbResponse = await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: 'product deleted' });
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  })
  .patch('/product/editProduct/:id', async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;

      console.log(body);
      const dbResponse = await Product.findByIdAndUpdate(id, body);
      return res.status(200).json({ message: 'product Upadeted' });
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  });
module.exports = router;
