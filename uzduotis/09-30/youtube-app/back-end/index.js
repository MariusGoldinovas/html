import { populateCategories } from './helpers/populateCategories.js';
import mongoose from 'mongoose';
import express from 'express';
import video from './controllers/video.js';
import user  from './controllers/user.js';
import category from './controllers/category.js';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';



// Load environment variables
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/youtube';
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret';
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB!');

        // Populate categories in MongoDB
        await populateCategories();

        const app = express();

        // Multer configuration for file uploads (adjust or remove if not in use)
        // const upload = multer({ dest: './uploads' });
        app.set('trust proxy', 1);  // Trust the first proxy
        // Session configuration with MongoStore for MongoDB
        app.use(session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            // store: MongoStore.create({
            //     mongoUrl: MONGO_URL,
            // }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,  // 1 day expiration
                secure: false,
                httpOnly: true,
            },
        }));

        // Middleware for parsing JSON and URL-encoded data
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Enable CORS
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true,   // Enable credentials in CORS
        }));

        // Serve static files from the 'uploads' directory
        app.use('/photos', express.static('./uploads'));

        // Use routers for API endpoints
        app.use('/api/video', video);
        app.use('/api/user', user);
        app.use('/api/category', category);


        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB or starting the server:', error);
    }
}

// Start the server
startServer();
