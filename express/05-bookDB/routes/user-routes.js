const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../db/models/user-schema');
const router = express.Router();
const jwt = require('jsonwebtoken');

router
  .get('/user', async (req, res) => {
    try {
      const dbResponse = await User.find();
      return res.status(200).json(dbResponse);
    } catch {
      return res.status(500).json({ message: e.mesage, error: true });
    }
  })
  .post('/user/sign-up', async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'email already taken' });
      }
      if (password != confirmPassword) {
        return res.status(400).json({ message: "passwords doesn't match" });
      }
      const hashPassword = await bcrypt.hash(password, 2);

      const dbResponse = await User.create({
        ...req.body,
        password: hashPassword,
      });
      return res.status(201).json({ message: 'ACCOUNT CREATED' });
    } catch (e) {
      return res.status(500).json({ message: e.mesage, error: true });
    }
  })
  .post('/user/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email or Password incorect' });
      }
      const isMactching = await bcrypt.compare(password, user.password);
      if (!isMactching) {
        return res.status(400).json({ mesage: 'Email or password Incorrect' });
      }
      const secretKey = 'bsbdfjsufikjsfuhuisjhsfjksfjgfdjdfjhgsd';

      const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
        expiresIn: '7d',
      });

      return res.status(200).json({ message: 'loggged In', token });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.mesage, error: true });
    }
  });

module.exports = router;
