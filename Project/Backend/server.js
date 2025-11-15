const express = require('express');
require('./DB');
require('dotenv').config('./.env');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const userRoutes = require('./routes/user-routes');
app.use(userRoutes);
const productRoutes = require('./routes/product-route');
app.use(productRoutes);
const imageRoutes = require('./routes/image-routes');
app.use(imageRoutes);
const cartRoutes = require('./routes/cart-routes');
app.use(cartRoutes);
const orderRoutes = require('./routes/order-routes');
app.use(orderRoutes);
const wishlistRoutes = require('./routes/wishlist-routes');
app.use(wishlistRoutes);
const ReviewRoutes = require('./routes/review-routes');
app.use(ReviewRoutes);

app.listen(8000, () => {
  console.log('App is running');
});
