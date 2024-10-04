import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Video', new Schema({
    title: String,
    description: String,
    videoId: String,
    thumbnail: String,
    views: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true 
}));