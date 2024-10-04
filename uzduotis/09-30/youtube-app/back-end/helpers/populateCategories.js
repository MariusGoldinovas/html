import Category from '../models/category.js';

export const populateCategories = async () => {
    const categories = ['Fashion', 'Comedy', 'Movie Trailers', 'Music', 'News'];

    try {
        // Check if there are any categories already in the database
        const categoryCount = await Category.countDocuments();
        
        if (categoryCount > 0) {
            console.log('Categories already populated');
            return;  // If categories already exist, exit the function
        }

        // Batch insert categories to avoid multiple database calls
        await Category.insertMany(categories.map(name => ({ name })));

        console.log('Categories successfully populated!');
    } catch (error) {
        console.error('Error populating categories:', error);
    }
};
