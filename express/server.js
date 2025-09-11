const express = require('express');
const app = express();

app.use(express.json());

const users = [{ Name: 'akhil', age: 21, place: 'ernakulam' }];

app.get('/', (req, res) => {
  res.send('hi');
});

app.post('/', (req, res) => {
  res.send('hello');
});
app.get('/products', (req, res) => {
  const products = ["apple,'orange", 'mango'];
  res.json(products);
});
app.post('/products', (req, res) => {
  const products = ["apple,'orange", 'Grapes'];
  res.json(products);
});
app.get('/users', (req, res) => {
  res.json(users);
});
app.post('/users', (req, res) => {
  if (req.body == null) {
    res.send('Add Details');
  } else if (req.body.Name == null) {
    res.send('Name is not Added');
  } else if (req.body.age == null) {
    res.send('age is not Added');
  } else if (req.body.place == null) {
    res.send('place is not Added');
  } else {
    users.push(req.body);
    res.json({ message: 'message added' });
  }
});

app.listen(8000, () => {
  console.log('App is Running');
});
