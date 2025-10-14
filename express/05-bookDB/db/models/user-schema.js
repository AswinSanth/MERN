const { Schema, model } = require('mongoose');

const addressSchema = Schema({
  houseName: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  pincode: {
    type: String,
    require: true,
  },
});
const userSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  address: [addressSchema],
  password: { type: String, required: true, trim: true },
  role: { type: String, enum: ['admin', 'user'] },
});

const User = model('users', userSchema);

module.exports = User;
