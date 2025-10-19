const express = require('express');
const cors = require('cors');
require('./db');
require('dotenv').config('./.env');

const app = express();

app.use(cors());
app.use(express.json());

const bookRoutes = require('./routes/book-routes');
app.use(bookRoutes);
const userRoutes = require('./routes/user-routes');
app.use(userRoutes);
const authorRoutes = require('./routes/author-routes');
app.use(authorRoutes);
const commentRoutes = require('./routes/comment-routes');
app.use(commentRoutes);
const imageRoutes = require('./routes/image-routes');
app.use(imageRoutes);
const orderRoutes = require('./routes/order-routes');
app.use(orderRoutes);

app.listen(8000, () => {
  console.log('app is running');
});
