import Order from '../models/order.js'
import mongoose from 'mongoose'

export const getOrders = async (req, res) => {
   try {
      const order = await Order.find()
      res.status(200).json(order);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export const postOrder = async (req, res) => {
   const order = req.body;

   const newOrder = new Order(order);

   try {
      await newOrder.save()
      res.status(201).json(newOrder);

   } catch (error) {
      res.status(409).json({ message: error.message })
   }
}

export const deleteOrder = async (req, res) => {
   const { _id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Order with that ID');

   await Order.findByIdAndRemove(_id);
   res.json({ message: 'User deleted successfully' });
}

export const updateOrder = async (req, res) => {
   const { _id } = req.params;
   const order = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that ID');

   const updatedOrder = await Order.findByIdAndUpdate(_id, { ...order, _id }, { new: true });

   res.json(updatedOrder);
}