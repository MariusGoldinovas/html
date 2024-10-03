import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Categories', new Schema({
    name: String,
}, {
    timestamps: true 
}));

