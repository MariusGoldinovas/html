import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User',new Schema({
    name: String,
    email: String,
    password: String,
    coverPhoto: String,
    userThumbnail: String,
    description: String,
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
}));