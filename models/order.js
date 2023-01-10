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

const orderSchema = mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   status: { type: String, required: true },
   paymentDate: { type: String, required: true },
   cubeNumber: { type: String },
   cart: [ cartSchema ],
   createdAt: {
      type: Date,
      default: new Date()
   },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;