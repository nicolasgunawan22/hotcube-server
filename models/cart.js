import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
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

const Cart = mongoose.model('Cart', postSchema);

export default Cart;