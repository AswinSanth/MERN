const express = require('express');
const router = express.Router();
const Wishlist = require('../DB/models/wishlist-schema');
const Product = require('../DB/models/product-schema');

router
  .post('/wishlist/add', async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const product = await Product.findById(productId);
      console.log(productId);
      if (!product)
        return res.status(404).json({ message: 'Product not Found' });

      let wishlist = await Wishlist.findOne({ user: userId });
      if (!wishlist) wishlist = new Wishlist({ user: userId, listItems: [] });

      const existingItem = wishlist.listItems.find(
        item => item.product.toString() === productId
      );
      if (existingItem) {
        return res
          .status(409)
          .json({ message: 'item already exists in wishlist' });
      }
      wishlist.listItems.push({ product: productId });

      await wishlist.save();
      res.status(200).json({ message: 'Product added to Wishlist', wishlist });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error adding to WishList', e });
    }
  })
  .get('/wishlist/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const wishlist = await Wishlist.findOne({ user: userId }).populate(
        'listItems.product'
      );

      if (!wishlist)
        return res.status(404).json({ message: 'wishlist not Found' });

      return res.status(200).json({ wishlist });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error adding to WishList', e });
    }
  })
  .delete('/wishlist/delete', async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const wishlist = await Wishlist.findOne({ user: userId });
      if (!wishlist)
        return res.status(404).json({ message: 'wishlist  not Found' });
      wishlist.listItems = wishlist.listItems.filter(
        item => item.product.toString() !== productId
      );
      await wishlist.save();
      res.status(200).json({ message: 'Item removed', wishlist });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error deleting from WishList', e });
    }
  });

module.exports = router;
