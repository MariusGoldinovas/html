import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Categories',new Schema({
    name: String,
    name: String,
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
}));

