import { Router } from 'express';
import User from '../models/user.js';
import { upload } from '../middleware/upload.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to reach server' });
    }
});

// GET a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Unable to reach server' });
    }
});

router.post('/', upload.fields([{ name: 'userThumbnail', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]), async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        }

        if (!req.files || !req.files['userThumbnail'] || !req.files['coverPhoto']) {
            return res.status(400).json({ error: 'Both userThumbnail and coverPhoto must be uploaded.' });
        }

        req.body.userThumbnail = req.files['userThumbnail'][0].filename;
        req.body.coverPhoto = req.files['coverPhoto'][0].filename;

        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        } catch (hashError) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        const newUser = await User.create(req.body);

        res.status(201).json({ 
            data: newUser,
            message: 'User successfully added'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Unable to reach server' });
    }
});


// PUT to update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ 
            data: updatedUser,
            message: 'User successfully updated'
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to update user' });
    }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ 
            message: 'User successfully deleted' 
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete user' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Negavome jokių duomenų, bandykite dar kartą');
        return res.status(400).json({ message: "Negavome jokių duomenų, bandykite dar kartą" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Neteisingi prisijungimo duomenys, bandykite dar kartą');
            return res.status(401).json({ message: "Neteisingi prisijungimo duomenys, bandykite dar kartą" });
        }

        // Use bcrypt.compare() to compare the plaintext password with the hashed password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            console.log('Neteisingi prisijungimo duomenys, bandykite dar kartą');
            return res.status(401).json({ message: "Neteisingi prisijungimo duomenys, bandykite dar kartą" });
        }

        console.log('Sveikiname sėkmingai prisijungus');

        // Return a success response and handle redirection in the front-end
        return res.json({ message: "Sveikiname sėkmingai prisijungus", user });

    } catch (error) {
        console.log("Įvyko klaida", error.message);
        return res.status(500).json({ message: "Įvyko klaida, bandykite dar kartą vėliau" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        // Send token and user data to client
        res.json({ token, user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
});
  
  router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
});

export default router;
