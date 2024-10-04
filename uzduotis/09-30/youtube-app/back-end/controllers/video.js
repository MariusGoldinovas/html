import { Router } from 'express';
import Video from '../models/video.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// GET all videos
// router.get('/', async (req, res) => {
//   try {
//       res.json(
//           await Video.find()
//           .populate({ path: 'user', select: ['userThumbnail', 'name'] })
//       );
//   } catch {
//       res.status(500).json('Unable to reach server');
//   }
// });

router.get('/', async (req, res) => {
  const sortOptions = ['views', 'createdAt', 'title'];

  const filter = {};
  if(req.query.category) 
      filter.category = req.query.category;

  try {
      res.json(
          await Video.find(filter)
          .sort({ [sortOptions[sortOptions.indexOf(req.query.sort)]] : 'desc' })
          .populate({ path: 'user', select: ['userThumbnail', 'name'] })
      );
  } catch {
      res.status(500).json('Unable to reach server');
  }
});

// GET all videos by user ID
router.get('/user/:userId', async (req, res) => {
  try {
      const videos = await Video.find({ user: req.params.userId }).populate({ path: 'user', select: ['userThumbnail', 'name'] });
      res.json(videos);
  } catch (error) {
      console.error('Error fetching videos for user:', error);
      res.status(500).json({ error: 'Unable to fetch videos for the user' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Video
    .findById(req.params.id)
    .populate({ path: 'user', select: ['userThumbnail', 'name'] });

      res.json(data);

      // Peržiūrų skaičiaus padidinimas
      await Video.findByIdAndUpdate(req.params.id, { views: ++data.views });
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

export default router;
