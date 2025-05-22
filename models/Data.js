import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({

    // phone: {
    //     type: String,
    // },
    weight1: {
        type: Number,
    },
    weight2: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    timestamp: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Data', dataSchema);