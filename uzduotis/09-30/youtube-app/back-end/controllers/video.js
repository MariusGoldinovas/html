import { Router } from 'express';
import Video from '../models/video.js';

const router = Router();

// Fetch all videos
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Nepavyko susisiekti su serveriu' });
    }
});

// Fetch a specific video by ID
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (video) {
            res.json(video);
        } else {
            res.status(404).json({ message: 'Video nerastas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Nepavyko susisiekti su serveriu' });
    }
});

// Add a new video
router.post('/', async (req, res) => {
    try {
        const newVideo = await Video.create(req.body);
        res.status(201).json(newVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Nepavyko pridėti video' });
    }
});

// Update a video by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedVideo) {
            res.json(updatedVideo);
        } else {
            res.status(404).json({ message: 'Video nerastas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Nepavyko atnaujinti video' });
    }
});

// Delete a video by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.id);
        if (deletedVideo) {
            res.json({ message: 'Video ištrintas sėkmingai' });
        } else {
            res.status(404).json({ message: 'Video nerastas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Nepavyko ištrinti video' });
    }
});

export default router;
