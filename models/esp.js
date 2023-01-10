import mongoose from 'mongoose'

const dataSchema = mongoose.Schema({
   status: {type: String, required: true},
   cubeId: {type: String, required: true },
   command:{ type: String, required: true },
   createdAt: { type: Date,default: Date.now()},
});

const ESPData = mongoose.model('ESPData', dataSchema);

export default ESPData;