import { Router } from 'express';
import Video from '../models/video.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// GET all videos
router.get('/', async (req, res) => {
  try {
      res.json(
          await Video.find()
          .populate({ path: 'user', select: ['userThumbnail', 'name'] })
      );
  } catch {
      res.status(500).json('Unable to reach server');
  }
});

router.get('/:id', async (req, res) => {
  try {
      res.json(
          await Video
          .findById(req.params.id)
          .populate({ path: 'user', select: ['userThumbnail', 'name'] })
      );
  } catch {
      res.status(500).json('Unable to reach server');
  }
});

router.get('/search', (req, res) => {
    const query = req.query.q;
    if (query) {
      // Filter videos based on query
      const filteredVideos = Video.videos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
      );
      res.json(filteredVideos);
    } else {
      res.json(videos); // Return all videos if no query
    }
  });

// POST a new video
router.post('/', upload.single('thumbnail'), async (req, res) => {
    try {
        req.body.thumbnail = req.file.filename;

        res.status(201).json({ 
            data: await Video.create(req.body),
            message: 'Video successfully uploaded'
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to reach server' });
    }
});

// PUT to update a video by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedVideo) {
        return res.status(404).json({ error: 'Video not found' });
      }
      res.json({ message: 'Video successfully updated', data: updatedVideo });
    } catch (error) {
      res.status(500).json({ error: 'Unable to update video' });
    }
  });
  

// DELETE a video by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.id);
        if (!deletedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json({ 
            message: 'Video successfully deleted' 
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete video' });
    }
});

// PUT route to increment views for a video
router.put('/increment-views/:id', async (req, res) => {
    try {
      const video = await Video.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } }, // Increment the view count by 1
        { new: true }
      );
      if (!video) {
        return res.status(404).json({ error: 'Video not found' });
      }
      res.json(video); 
    } catch (error) {
      res.status(500).json({ error: 'Unable to update views' });
    }
  });
  

export default router;
