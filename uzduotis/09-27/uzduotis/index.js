import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.urlencoded());

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/antra_duombaze');
    console.log('Connected to MongoDB!');
} catch {
    console.log('Prisijungimas nepavyko:', error.message);
}

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserForm = new Schema({
    id: ObjectId,
    name: {
        type: String,
        required: [true, "Vardas yra privalomas"],
        minlength: [3, "Vardas turi būti bent 3 simbolių ilgio"],
        maxlength: [200, "Vardas per ilgas, turi būti ne daugiau 200 simbolių"],
    },
    last_name: {
        type: String,
        required: [true, "Pavardė yra privaloma"],
    },
    email: {
        type: String,
        required: [true, "El. paštas yra privalomas"],
        minlength: [5, "El. paštas turi būti bent 5 simbolių ilgio"],
        maxlength: [50, "El. paštas per ilgas, turi būti ne daugiau 50 simbolių"],
        match: [/^\S+@\S+\.\S+$/, "Įveskite galiojantį el. pašto adresą"],
    },
    password: {
        type: String,
        required: [true, "Slaptažodis yra privalomas"],
        minlength: [8, "Slaptažodis turi būti bent 8 simbolių ilgio"],
        maxlength: [16, "Slaptažodis turi būti ne daugiau 16 simbolių"],
        match: [/(?=.*\d)/, "Slaptažodis turi turėti bent vieną skaičių"],
    },
});

const User = mongoose.model('User', UserForm);

app.get('/', (req, res) => {
    try {
        console.log('Kažkas užėjo į svečius');
        res.json({ message: "Sveiki atvykę į API!" });
    } catch (error) {
        console.log('Klaida', error.message);
    }
});

app.post("/register", async (req, res) => {
    try {
        const { name, last_name, email, password } = req.body;

        const newUser = await User.create({ name, last_name, email, password });

        console.log("Sveikinu sėkmingai prisiregistravus platformoje");
        res.json(newUser);
    } catch (error) {
        console.log("Negauti visi registracijos duomenys", error.message);
        res.json({
            error: "Negauti registracijos duomenys"
        });
    }
});

app.get('/users', async (req, res) => {
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

app.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.log('Klaida atnaujinant vartotoją:', error.message);
        res.json({ error: "Nepavyko atnaujinti vartotojo." });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        console.log('User ištrintas');
        res.json({ message: "User ištrintas" });
    } catch (error) {
        console.log('Klaida trinant vartotoją:', error.message);
        res.json({ error: "Nepavyko ištrinti vartotojo." });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Negavome jokių duomenų, bandykite dar kartą');
        return res.json({ message: "Negavome jokių duomenų, bandykite dar kartą" });
    }

    try {
        const user = await User.findOne({ email, password });

        if (!user || user.password !== password) {
            console.log('Neteisingi prisijungimo duomenys, bandykite dar kartą');
            return res.json({ message: "Neteisingi prisijungimo duomenys, bandykite dar kartą" });
        }

        console.log('Sveikiname sėkmingai prisijungus');
        res.json({ message: "Sveikiname sėkmingai prisijungus" });
    } catch (error) {
        console.log("Įvyko klaida", error.message);
        res.json({ message: "Įvyko klaida, bandykite dar kartą vėliau" });
    }
});

app.listen(3000, () => console.log('Serveris įjungtas'));
