import mongoose, { Schema } from 'mongoose';
import express from 'express';
import video from './controllers/video.js'
import user from './controllers/user.js'
import cors from 'cors'; 

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/youtube');
   console.log('Connected Mongoose!');

   const app = express();

    app.use(express.urlencoded({ extended: true }));

    app.use(cors({
        origin: 'http://localhost:5173', // Replace with your frontend URL
        methods: 'GET,POST,PUT,DELETE',  // Specify allowed methods if needed
        credentials: true                // Enable this if using cookies, sessions, etc.
    }));

    app.use('/api/video', video);
    app.use('/api/user', user);


    app.listen(3000, () => {
        console.log(`Server running on port 3000`);
    });

} catch {
    console.log('Erororas!');
}
  
