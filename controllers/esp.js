import ESPData from '../models/esp.js'
import mongoose from 'mongoose'

export const getEspData = async (req, res) => {
   try {
      const data = await ESPData.find()
      res.status(200).json(data);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export const getEsp1Data = async (req, res) => {
   try {
      const data = await ESPData.find({ 'cubeId': '1' })
      res.status(200).json(data);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export const getEsp2Data = async (req, res) => {
   try {
      const data = await ESPData.find({ 'cubeId': '2' })
      res.status(200).json(data);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export const postEspData = async (req, res) => {
   const data = req.body;
   const newData = new ESPData(data);

   try {
      await newData.save()
      res.status(201).json(newData);
   } catch (error) {
      res.status(409).json({ message: error.message })
   }
}

export const updateEspData = async (req, res) => {
   const { _id } = req.params;
   const data = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that ID');

   const updatedData = await ESPData.findByIdAndUpdate(_id, { ...data, _id }, { new: true });

   res.json(updatedData);
}

export const deleteEspData = async (req, res) => {
   const { _id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that ID');

   await ESPData.findByIdAndRemove(_id);
   res.json({ message: 'Data deleted successfully' });
}

export const deleteManyEspData = async (req, res) => {
   const filter = req.body;

   await ESPData.deleteMany(filter);
   res.json({ message: 'Data deleted successfully' });
}