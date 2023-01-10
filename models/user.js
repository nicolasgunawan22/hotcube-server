import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
   itemId: {
      type: String,
   },
   title: String,
   amount: {
      type: Number,
      default: 0
   },
   price: {
      type: Number,
      default: 0
   },
   createdAt: {
      type: Date,
      default: new Date()
   },
});

const userSchema = mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
   id: { type: String },
   balance: {
      type: Number,
      default: 100000
   },
   cart: [cartSchema],
   createdAt: {
      type: Date,
      default: new Date()
   },
});

const User = mongoose.model('User', userSchema);

export default User;