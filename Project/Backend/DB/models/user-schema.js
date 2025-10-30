const { Schema, model } = require('mongoose');

const userSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  password: { type: String, required: true, trim: true },
});

const User = model('users', userSchema);

module.exports = User;
