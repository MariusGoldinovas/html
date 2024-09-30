import Router from 'express';
import User from '../models/user.js'; 

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, coverPhoto, userThumbnail, description  } = req.body;

        const newUser = await User.create({ name, email, password, coverPhoto, userThumbnail, description });

        console.log("Sveikinu sėkmingai prisiregistravus platformoje");
        res.json(newUser);
    } catch (error) {
        console.log("Negauti visi registracijos duomenys", error.message);
        res.json({
            error: "Negauti registracijos duomenys"
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log('Klaida gaunant vartotojus iš duomenų bazės:', error.message);
        res.json({
            error: "Nepavyko nuskaityti vartotojų iš duomenų bazės."
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.log('Klaida atnaujinant vartotoją:', error.message);
        res.json({ error: "Nepavyko atnaujinti vartotojo." });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        console.log('User ištrintas');
        res.json({ message: "User ištrintas" });
    } catch (error) {
        console.log('Klaida trinant vartotoją:', error.message);
        res.json({ error: "Nepavyko ištrinti vartotojo." });
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

        if (!user || user.password !== password) {
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



export default router;
