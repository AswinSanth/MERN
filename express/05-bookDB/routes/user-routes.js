const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../db/models/user-schema');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.post('/user/forget', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'email incorect' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY_RESET,
      {
        expiresIn: '1h',
      }
    );
    console.log(token);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'programlearn8@gmail.com',
        pass: 'xvxb nwyo rxkt gewz',
      },
    });

    let mailOptions = {
      from: 'programlearn8@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `hi
  plaese reset password with this ${token}`,
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
    console.log(e);
    return res.status(500).json({ message: e.mesage, error: true });
  }
});
router.post('/user/reset-password', async (req, res) => {
  try {
    const { password, confrimPassword, email, token } = req.body;
    const decoded = jwt.verify(token, process.env.SECRET_KEY_RESET);
    const user = await User.findOne({ email });
    console.log(user._id,decoded.id);
    if (user._id != decoded.id) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    if (password != confrimPassword) {
      return res.status(400).json({ message: ' passsword dosent match' });
    }
    const hashedPassword = await bcrypt.hash(password, 2);
    const dbResponse = await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    return res.status(200).json({ message: 'password reseted ' });
  } catch {
    return res.status(500).json({ message: e.mesage, error: true });
  }
});

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
        return res.status(400).json({ message: 'Email or password Incorrect' });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: '7d',
        }
      );

      return res.status(200).json({ message: 'loggged In', token });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.mesage, error: true });
    }
  })
  .patch('/user/:id/address', async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;

      const user = await User.findById(id);
      user.address.push(body);
      await user.save();
      return res.status(200).json({ message: 'new Address added' });
    } catch (e) {
      return res.status(500).json({ message: e.mesage, error: true });
    }
  })
  .patch('/user/:userId/address/:addressId', async (req, res) => {
    try {
      const { houseName, city, pincode } = req.body;
      const { userId, addressId } = req.params;
      const user = await User.findById(userId);
      let address = await user.address.id(addressId);
      if (houseName) address.houseName = houseName;
      if (city) address.city = city;
      if (pincode) address.pincode = pincode;
      await user.save();
      return res.status(200).json({ message: 'new Address updated' });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.message, error: true });
    }
  })
  .delete('/user/:userId/address/:addressId', async (req, res) => {
    try {
      const { houseName, city, pincode } = req.body;
      const { userId, addressId } = req.params;
      const user = await User.findById(userId);
      let address = await user.address.id(addressId);
      address.deleteOne();
      await user.save();
      return res.status(200).json({ message: 'Address deleted' });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.mesage, error: true });
    }
  });

module.exports = router;
