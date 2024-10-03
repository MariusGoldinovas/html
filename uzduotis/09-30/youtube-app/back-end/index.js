import mongoose, { Schema } from 'mongoose';
import express from 'express';
import video from './controllers/video.js'
import user from './controllers/user.js'
import cors from 'cors'; 
import multer from 'multer';


try {
    await mongoose.connect('mongodb://127.0.0.1:27017/youtube');
   console.log('Connected Mongoose!');

   const app = express();

   const upload = multer({ dest: './uploads'});

    app.use(express.urlencoded({ extended: true }));

    app.use(cors({
        origin: 'http://localhost:5173'
    }));    

    app.use('/photos', express.static('./uploads'));

    app.use('/api/video', video);
    app.use('/api/user', user);


    app.listen(3000, () => {
        console.log(`Server running on port 3000`);
    });

} catch {
    console.log('Erororas!');
}
  
