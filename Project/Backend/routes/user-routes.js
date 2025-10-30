const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../DB/models/user-schema');
const router = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv")
router
  .get('/user', async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  })
  .post('/user/signUp', async (req, res) => {
    try {
      const { email, password, confrimPassword } = req.body;

      console.log(req.body);
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Email Already Taken' });
      }
      if (password != confrimPassword) {
        return res.status(400).json({ message: "Passwords doesn't Match" });
      }

      const hashedPassword = await bcrypt.hash(password, 2);
      const dbResponse = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      return res.status(200).json(dbResponse);
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  })
  .post('/user/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Email or Password Dosen't Exist" });
      }

      const isMatching = await bcrypt.compare(password, user.password);
      if (!isMatching) {
        return res.status(400).json({ message: 'Email or password Incorrect' });
      }
      
      const token = jwt.sign(
        {
          id: user,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
      return res.status(200).json({ message: 'loggged In', token });

    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  });
module.exports = router;
