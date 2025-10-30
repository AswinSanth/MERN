const express = require('express');
const Order = require('../DB/models/order-schema');
const Cart = require('../DB/models/cart-schema');
const User = require('../DB/models/user-schema');
const Product = require('../DB/models/product-schema');

const router = express.Router();

router.post('/order/add', async (req, res) => {
  try {
    const { userId, productId, quantity, type, shippingAddress } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User Not Found' });
    let orderProducts = [];
    let totalAmount = 0;
    let totalItems = 0;
    if (type === 'direct') {
      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ message: 'Product not found' });
      orderProducts.push({ productId: product._id, quantity });
      totalAmount = product.price * quantity;
      totalItems = 1;
    } else if (type === 'cart') {
      const cart = await Cart.findOne({ user: userId }).populate(
        'items.product'
      );
      if (!cart || cart.items.length === 0)
        return res.status(400).json({ message: 'Cart is empty' });
      orderProducts = cart.items.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));

      totalAmount = cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      totalItems = cart.items.length;

      await Cart.findOneAndUpdate({ user: userId }, { items: [] });
    } else {
      return res.status(400).json({ message: 'Invalid order type' });
    }
    const finalAddress =
      shippingAddress && Object.keys(shippingAddress).length > 0
        ? shippingAddress
        : user.address;
    const newOrder = await Order.create({
      userId,
      products: orderProducts,
      totalAmount,
      totalItems,
      address: finalAddress,
      status: 'Pending',
    });
    res
      .status(200)
      .json({ message: 'Order placed successfully', order: newOrder });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message, error: true });
  }
});

router.delete('/order/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: 'Order permanently deleted' });
  } catch (e) {
    res.status(400).json({ message: e.message, error: true });
  }
});
router.get('/order/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate('products.productId', 'title price image')
      .sort({ createdAt: -1 }); // latest first

    if (!orders || orders.length === 0)
      return res.status(404).json({ message: 'No orders found' });

    res.status(200).json(orders);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message, error: true });
  }
});

module.exports = router;
