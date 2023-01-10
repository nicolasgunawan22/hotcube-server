import express from 'express';
import { getCart, postCartItem, updateCartItem, deleteCartItem } from '../controllers/cart.js'

const router = express.Router();

// Put the function of each method inside controller folder
router.get('/', getCart);
router.post('/', postCartItem);
router.patch('/:itemId', updateCartItem);
router.delete('/:_id', deleteCartItem);

export default router;