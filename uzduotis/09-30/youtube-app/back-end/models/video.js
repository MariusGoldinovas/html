import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Video',new Schema({
    title: String,
    description: String,
    videoId: String,
    thumbnail: String,
    views: { 
        type: Number,
        default: 0
    },
    categoryId: Schema.ObjectId,
    userId: Schema.ObjectId,
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
}));