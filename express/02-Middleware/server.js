const express = require('express');

const app = express();
const { printTime,printnow } = require('./middlewares/middleware');

app.use(printnow);
app.get('/products', printTime, (req, res) => {
  res.status(200).json({ message: 'product route' });
});
app.get('/users', (req, res) => {
  res.status(200).json({ message: 'users route' });
});

app.listen(3000, () => {
  console.log('app is running');
});
