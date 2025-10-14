const express = require('express');
const cors = require('cors');
require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const bookRoutes = require('./routes/book-routes');
app.use(bookRoutes);
const userRoutes = require('./routes/user-routes');
app.use(userRoutes);
const authorRoutes = require('./routes/author-routes');
app.use(authorRoutes);

app.listen(8000, () => {
  console.log('app is running');
});
