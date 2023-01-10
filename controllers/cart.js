import Cart from '../models/cart.js'
import mongoose from 'mongoose'

export const getCart = async (req, res) => {
   try {
      const cart = await Cart.find()
      res.status(200).json(cart);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export const postCartItem = async (req, res) => {
   const post = req.body;

   const newPost = new Cart(post);

   try {
      await newPost.save()
      res.status(201).json(newPost);

   } catch (error) {
      res.status(409).json({ message: error.message })
   }
}

export const updateCartItem = async (req, res) => {
   const { itemId } = req.params;
   const cartItem = req.body;

   try {
      const updatedCart = await Cart.findOneAndUpdate({"itemId":itemId}, { ...cartItem, itemId}, { new: true });
      res.json(updatedCart);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export const deleteCartItem = async (req, res) => {
   const { _id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that ID');

   await Cart.findByIdAndRemove(_id);
   res.json({ message: 'Post deleted successfully' });
}