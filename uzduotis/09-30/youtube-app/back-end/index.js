import { populateCategories } from './helpers/populateCategories.js';
import mongoose from 'mongoose';
import express from 'express';
import video from './controllers/video.js';
import user from './controllers/user.js';
import category from './controllers/category.js';
import cors from 'cors'; 
import multer from 'multer';
import session from 'express-session';
import MongoStore from 'connect-mongo';

async function startServer() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/youtube');
        console.log('Connected to MongoDB!');

        // Populate categories in MongoDB
        populateCategories();

        const app = express();

        // Multer configuration for file uploads
        const upload = multer({ dest: './uploads' });

        // Middleware for parsing URL-encoded data
        app.use(express.urlencoded({ extended: true }));

        // Enable CORS
        app.use(cors({
            origin: 'http://localhost:5173', // Adjust this to match your frontend's URL
        }));

        app.use('/photos', express.static('./uploads'));

        // Session configuration with MongoStore for MongoDB
        app.use(session({
            secret: 'your-secret',  // Use a strong secret for signing session cookies
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: 'mongodb://127.0.0.1:27017/youtube',  // MongoDB URL
                collectionName: 'sessions',  // Optional: where sessions are stored
            }),
            cookie: { maxAge: 1000 * 60 * 60 * 24 }  // Cookie expiration set to 1 day
        }));

        // Use routers for API endpoints
        app.use('/api/video', video);
        app.use('/api/user', user);
        app.use('/api/category', category);

        // Start the server
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB or starting the server:', error);
    }
}

// Start the server
startServer();
