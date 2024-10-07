import { Router } from 'express';
import Video from '../models/video.js';
import { upload } from '../middleware/upload.js';
import { isAuthenticated } from '../middleware/auth.js';  // Session authentication middleware


const router = Router();

// Combined GET route with sorting and filtering
router.get('/', async (req, res) => {
  const sortOptions = ['views', 'createdAt', 'title'];
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  let sortField = 'createdAt';  // Default sort option
  if (req.query.sort && sortOptions.includes(req.query.sort)) {
    sortField = req.query.sort;
  }

  try {
    const videos = await Video.find(filter)
      .sort({ [sortField]: 'desc' })
      .populate({ path: 'user', select: ['userThumbnail', 'name'] });
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Unable to reach server' });
  }
});

// GET all videos by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const videos = await Video.find({ user: req.params.userId })
      .populate({ path: 'user', select: ['userThumbnail', 'name'] });
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos for user:', error);
    res.status(500).json({ error: 'Unable to fetch videos for the user' });
  }
});

// GET video by ID and increment views
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate({ path: 'user', select: ['userThumbnail', 'name'] });
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Respond with the video data before incrementing views
    res.json(video);

    // Safely increment views after response
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json('Unable to reach server');
  }
});

// GET search videos by title or description
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Search query is missing' });
  }

  try {
    const filteredVideos = await Video.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).populate({ path: 'user', select: ['userThumbnail', 'name'] });

    res.json(filteredVideos);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Unable to search videos' });
  }
});

// POST route for uploading videos, only accessible to authenticated users
router.post('/', isAuthenticated, upload.single('thumbnail'), async (req, res) => {
  try {
      req.body.user = req.session.userId;  // Attach the user ID from the session
      req.body.thumbnail = req.file.filename;  // Get the uploaded file's name

      const video = await Video.create(req.body);
      res.status(201).json({ message: 'Video successfully uploaded', data: video });
  } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ message: 'Internal server error' });
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
    console.error('Error updating video:', error);
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
    res.json({ message: 'Video successfully deleted' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Unable to delete video' });
  }
});

export default router;
