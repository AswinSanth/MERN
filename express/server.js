const express = require('express');
const uniqid = require('uniqid');

const app = express();

app.use(express.json());

const users = [{ name: 'akhil', age: 21, place: 'ernakulam', id: uniqid() }];
const products = ['apple', 'orange', 'mango'];

app.get('/', (req, res) => {
  res.send('hi');
});

app.post('/', (req, res) => {
  res.send('hello');
});
app.get('/products', (req, res) => {
  res.json(products);
});
app.post('/products', (req, res) => {
  // const products = ["apple,'orange", 'Grapes'];
  // products.push(req.body);
  // res.json({ message: 'message added' });
  const { product } = req.body;
  products.push(product);
  res.status(201).json({ message: 'product added' });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  products.splice(id, 1);
  res.json(products[id]);
  res.json({ message: 'product deleted' });
});
app.patch('/products/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  products.splice(id, 1, body.data);
  res.json({ message: 'product updated' });
});

app.get('/users', (req, res) => {
  res.json(users);
});
app.post('/users', (req, res) => {
  // if (req.body == null) {
  //   res.send('Add Details');
  // } else if (req.body.Name == null) {
  //   res.send('Name is not Added');
  // } else if (req.body.age == null) {
  //   res.send('age is not Added');
  // } else if (req.body.place == null) {
  //   res.send('place is not Added');
  // } else {
  //   users.push(req.body);
  //   res.json({ message: 'message added' });
  // }

  const { name, age, place } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'name is reqired' });
  } else if (!age) {
    return res.status(400).json({ message: 'age is reqired' });
  }
  if (!place) {
    return res.status(400).json({ message: 'place  is reqired' });
  }
  users.push(req.body);
  req.body.id = uniqid();
  return res.status(201).json({ message: 'user added succesfully' });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);
  res.json({ message: 'user deleted' });
});

app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, place } = req.body;

  const user=users.filter(us=>us.id===id)

    user.name = name;
    user.age = age;
    user.place = place;
  res.json({ message: 'user updated' });
});

app.listen(8000, () => {
  console.log('App is Running');
});
