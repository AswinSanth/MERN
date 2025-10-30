const express = require('express');
require('./DB');
require('dotenv').config('./.env');

const app = express();
app.use(express.json());
const userRoutes = require('./routes/user-routes');
app.use(userRoutes);
const productRoutes = require('./routes/product-route');
app.use(productRoutes);
const imageRoutes = require('./routes/image-routes');
app.use(imageRoutes);

app.listen(8000, () => {
  console.log('App is running');
});
