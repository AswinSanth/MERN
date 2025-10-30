const express = require('express');
const router = express.Router();
const Cart = require('../DB/models/cart-schema');
const Product = require('../DB/models/product-schema');

router.post('/cart/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'product not found' });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }
    let total = 0;
    for (const item of cart.items) {
      const p = await Product.findById(item.product);
      total += Number(p.price) * item.quantity;
    }

    cart.totalPrice = total;

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error adding to cart', e });
  }
});
router.get('/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId }).populate(
      'items.product',
      'title price catergory image'
    );
    if (!cart) {
      return res.status(500).json({ message: 'Cart Is Empty' });
    }
    res.status(200).json(cart);
  } catch (e) {
    res.status(500).json({ message: 'Error fetching cart', e });
  }
});

router.put('/cart/update', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: 'cart  not found' });
    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item)
      return res.status(404).json({ message: 'Item not found in cart' });

    item.quantity = quantity;
    let total = 0;
    for (const item of cart.items) {
      const p = await Product.findById(item.product);
      total += Number(p.price) * item.quantity;
    }

    cart.totalPrice = total;

    await cart.save();
    res.status(200).json({ message: 'updated', cart });
  } catch (e) {
    res.status(500).json({ message: 'Error while Updating', e });
  }
});

router.delete('/cart/delete', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    let total = 0;
    for (const i of cart.items) {
      const p = await Product.findById(i.product);
      total += Number(p.price) * i.quantity;
    }
    cart.totalPrice = total;

    await cart.save();
    res.status(200).json({ message: 'Item removed', cart });
  } catch (e) {
    res.status(500).json({ message: 'Error while deleting', e });
  }
});
module.exports = router;
