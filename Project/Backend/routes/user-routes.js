const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../DB/models/user-schema');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
router
  .get('/user', async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  })
  .get('/user/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  })
  .post('/user/signUp', async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;

      console.log(req.body);
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Email Already Taken' });
      }
      if (password != confirmPassword) {
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
          id: user._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
      return res.status(200).json({ message: 'loggged In', token, user });
    } catch (e) {
      return res.status(400).json({ message: e.message, error: true });
    }
  })
  .patch('/user/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedUser = await User.findByIdAndUpdate(id, updates);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        message: 'User profile updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message, error: true });
    }
  })
  .post('/user/forgot', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email Dosen't Exist" });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY_RESET,
        { expiresIn: '1h' }
      );

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mernproject845@gmail.com',
          pass: 'bolj ckaz geda mqje',
        },
      });
      const resetLink = `http://localhost:5173/Reset/${token}`;
      let mailOptions = {
        from: 'mernproject845@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: `Hi
      plaese reset password with this ${resetLink}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          throw error;
        }
        res.status(200).json({ message: token });
        res.status(200).json({ message: 'email Sent' });
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  })
  .post('/user/reset', async (req, res) => {
    try {
      const { email, password, confirmPassword, token } = req.body;
      const decoded = jwt.verify(token, process.env.SECRET_KEY_RESET);
      const user = await User.findOne({ email });
      if (user._id != decoded.id) {
        console.log(user)
        console.log(user._id,decoded.id)
        return res.status(400).json({ message: 'Invalid Token' });
      }
      if (password != confirmPassword) {
        return res.status(400).json({ message: "Passwords doesn't Match" });
      }

      const hashedPassword = await bcrypt.hash(password, 2);
      await User.findByIdAndUpdate(user._id,{
        password: hashedPassword,
      });
      res.status(200).json({ message: 'Passwords changed' });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  });

module.exports = router;
