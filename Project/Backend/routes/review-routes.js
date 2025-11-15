const express = require('express');
const router = express.Router();
const Review = require('../DB/models/review-schema');
const User = require('../DB/models/user-schema');
const Product = require('../DB/models/product-schema');

router
  .post('/review/add', async (req, res) => {
    try {
      const { userId, productId, rating, comment } = req.body;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ message: 'Product not found' });

      let review = await Review.findById(userId);
      if (!review) {
        review = new Review({
          user: userId,
          product: productId,
          username: `${user.firstName} ${user.lastName}`,
          rating,
          comment,
        });
      }

      await review.save();
      return res.status(200).json({
        message: 'Review saved successfully',
        review,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error adding review', error });
    }
  })
  .patch('/review/edit/:reviewId', async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;
      let review = await Review.findById(reviewId);
      if (!review) return res.status(404).json({ message: 'Review not Found' });
      if (rating) review.rating = rating;
      if (comment) review.comment = comment;
      await review.save();
      return res.status(200).json({
        message: 'Review updated successfully',
        review,
      });
    } catch (e) {
      return res.status(500).json({ message: 'Error during updating', e });
    }
  })
  .delete('/review/delete/:reviewId', async (req, res) => {
    try {
      const { reviewId } = req.params;
      await Review.findByIdAndDelete(reviewId);
      return res.status(200).json({
        message: 'Review deleted successfully',
        
      });
    } catch (e) {
      return res.status(500).json({ message: 'error while deleting', e });
    }
  });

module.exports = router;
