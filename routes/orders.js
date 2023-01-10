import express from 'express';
import { getOrders, postOrder, deleteOrder, updateOrder } from '../controllers/orders.js'

const router = express.Router();

router.get('/', getOrders);
router.post('/', postOrder);
router.delete('/:_id', deleteOrder);
router.patch('/:_id', updateOrder);

export default router;