const { application } = require('express');
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const checkToken = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(403).json({ message: 'Authentication error' });
    }
    const token = bearerToken.split(' ')[1];

    const decoded = jwt.verify(token, process.env.SECERT_KEY);
    req.check = decoded.id;
    next();
  } catch (e) {
    res.status(403).json({ message: 'authentication Invalid' });
  }
};

module.exports =checkToken;