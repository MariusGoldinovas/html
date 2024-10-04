import { Router } from 'express';
import Category from '../models/category.js';

const router = Router();

// Route to fetch all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();  // Fetch categories from the database
        res.json(categories);  // Return the categories in JSON format
    } catch (error) {
        console.error('Error fetching categories:', error);  // Log the error for debugging
        res.status(500).json({ message: 'Unable to reach server, please try again later.' });  // Send a more detailed error message
    }
});

export default router;
