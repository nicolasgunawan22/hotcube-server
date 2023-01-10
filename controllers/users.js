import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import mongoose from 'mongoose'


export const signin = async (req, res) => {
   const { email, password } = req.body;
   
   try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) return res.status(404).json({ message: "User doesn't exist." })
      
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." })
      
      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })
      res.status(200).json({ result: existingUser, token });
      
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
   }
}

export const signup = async (req, res) => {
   
   const { firstName, lastName, email, password, confirmPassword } = req.body;
   
   try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exist." })
      
      if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." })
      
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});
      const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })
      res.status(201).json({ result: result, token });
      
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong.' });
   }
}

export const getUser = async (req, res) => {
   try {
      const user = await User.find()
      res.status(200).json(user);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export const updateUser = async (req, res) => {
   const { _id } = req.params;
   const user = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that ID');

   const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });

   res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
   const { _id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that ID');

   await User.findByIdAndRemove(_id);
   res.json({ message: 'User deleted successfully' });
}


// Cart

export const getCart = async (req, res) => {
   try {
      const { email } = req.params;
      const user = await User.findOne({ "email": email })
      const cart = user["cart"]
      res.status(200).json(cart);
      
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}
export const getCartItem = async (req, res) => {
   try {
      const user = await User.findOne({ "email": req.params.email }, { "cart": {$elemMatch: { "itemId": req.params.itemId }}})

      res.status(200).json(user["cart"]);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export const postCartItem = async (req, res) => {
   const { email } = req.params;
   const item = req.body;
   
   try {
      const user = await User.findOneAndUpdate({ "email": email }, {$push: {"cart": [item]}}, { new: true });

      const updatedCart = user['cart']
      res.json(updatedCart);

   } catch (error) {
      res.status(409).json({ message: error.message })
   }
}

export const updateCartItem = async (req, res) => {
   const email = req.params.email;
   const itemId = req.params.itemId;
   const cartItem = req.body;

   try {
      const user = await User.findOneAndUpdate({ "email": email, "cart": { $elemMatch: { "itemId": itemId } } }, { $set: { "cart.$": { ...cartItem, itemId } } }, { new: true });
      const updatedCart = user['cart']
      res.json(updatedCart);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export const deleteCartItem = async (req, res) => {
   const email = req.params.email;
   const _id = req.params._id;

   try {
      await User.findOneAndUpdate({ "email": email, "cart": { $elemMatch: { "_id": _id } } }, { $pull: { "cart": { "_id": _id } } }, { new: true });
      res.json({ message: 'Post deleted successfully' });

   } catch (error) {
      res.status(409).json({ message: error.message })
   }
}