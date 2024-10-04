import mongoose, { Schema } from 'mongoose';

// Define the schema for the Category model
const categorySchema = new Schema({
    name: { type: String, required: true },  // Ensures the name is required
}, {
    timestamps: true  // Automatically creates 'createdAt' and 'updatedAt' fields
});

// Export the model with a singular name 'Category'
export default mongoose.model('Category', categorySchema);
