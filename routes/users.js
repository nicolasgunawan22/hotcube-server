import express from "express";
import { signin, signup, deleteUser, getUser, updateUser, getCart, postCartItem, updateCartItem, deleteCartItem, getCartItem  } from "../controllers/users.js";

const router = express.Router();

router.get('/', getUser);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch('/:_id', updateUser);
router.delete('/:_id', deleteUser);

router.get('/:email', getCart);
router.get('/:email/:itemId', getCartItem);
router.post('/:email', postCartItem);
router.patch('/:email/:itemId', updateCartItem);
router.delete('/:email/:_id', deleteCartItem);

export default router;