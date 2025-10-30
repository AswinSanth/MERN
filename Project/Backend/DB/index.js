const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/e-commerceDB')
  .then(() => {
    console.log('E-CommerceDB connnected');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;
