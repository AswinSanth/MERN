
const { Schema, model } = require('mongoose');

const commentSchema = Schema({
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min:0 ,max:5,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  price: { type: Number, min: 200, max: 2000 },
});

const  Comment= model('comments', commentSchema);
module.exports = Comment
