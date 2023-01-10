import express from 'express';
import { getEspData, postEspData, updateEspData, deleteEspData, getEsp1Data, getEsp2Data, deleteManyEspData } from '../controllers/esp.js'

const router = express.Router();

router.get('/', getEspData);
router.get('/esp-1', getEsp1Data);
router.get('/esp-2', getEsp2Data);
router.post('/', postEspData);
router.patch('/:_id', updateEspData);
router.delete('/:_id', deleteEspData);
router.delete('/delete/deleteMany', deleteManyEspData);

export default router;