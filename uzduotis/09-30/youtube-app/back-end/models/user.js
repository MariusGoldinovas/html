import mongoose, { Schema } from 'mongoose';

export default mongoose.model('User', new Schema({
    name: {
        type: String,
        required: true, 
        minLength: 3, 
        maxLength: 20 
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Įveskite galiojantį el. pašto adresą"] 
    },
    password: {
        type: String,
        required: true
    },
    coverPhoto: {
        type: String,
        required: true
    },
    userThumbnail: {
        type: String,
        required: true
    },
    description: String,
}, {
    timestamps: true
}));