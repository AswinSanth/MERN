const { Schema, model } = require('mongoose');

const userSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  address: {
    fullname: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  // shippingAddress: {
  //   fullname: String,
  //   phone: String,
  //   street: String,
  //   city: String,
  //   state: String,
  //   pincode: String,
  // },
  password: { type: String, required: true, trim: true },
});

const User = model('users', userSchema);

module.exports = User;
