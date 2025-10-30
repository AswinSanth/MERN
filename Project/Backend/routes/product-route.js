const express = require('express');

const Product = require('../DB/models/product-schema');
const router = express.Router();

require('dotenv');
router
  .get('/product', async (req, res) => {
    try {
      const {
        title,
        price,
        sort,
        sortby = 'title',
        sortorder = 'asc',
        minprice,
        maxprice,
        category,
      } = req.query;
      const query = {};
      if (title) query.title = { $regex: title, $options: 'i' };
      if (category) query.category = { $in: category };
      if (price) query.price = price;
      else if (minprice && maxprice) {
        query.price = { $gte: minprice, $lte: maxprice };
      } else if (minprice) query.price = { $gte: minprice };
      else if (minprice) query.price = { $gte: maxprice };

      let sortOptions = {};
      if (sort == 'lowToHigh') sortOptions.price = 1;
      else if (sort == 'hightoLow') sortOptions.price = -1;
      else sortOptions[sortby || 'title'] = sortorder === 'desc' ? -1 : 1;

      const response = await Product.find(query).sort(sortOptions);
      return res.status(200).json(response);
    } catch (e) {
      console.log(e);
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
  })
  .get('/product/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Product.findById(id);
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  });
module.exports = router;
