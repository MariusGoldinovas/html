import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
// Middleware, leidžianti Express apdoroti JSON užklausas
app.use(express.json());

app.get('/', (req, res) => {
    res.json([
        { id: 1, vardas: 'Jonas' },
        { id: 2, vardas: 'Petras' }
    ]);
});

app.post('/', (req, res) => {
    const naujasVartotojas = req.body;
    res.json({ zinute: 'Vartotojas sukurtas', duomenys: naujasVartotojas });
});

app.put('/:id', (req, res) => {
    const vartotojoId = req.params.id;
    const atnaujintiDuomenys = req.body;
    res.json({ zinute: `Vartotojas su ID ${vartotojoId} atnaujintas`, duomenys: atnaujintiDuomenys });
});

app.delete('/:id', (req, res) => {
    const vartotojoId = req.params.id;
    res.json({ zinute: `Vartotojas su ID ${vartotojoId} pašalintas` });
});


app.listen(3000, () => {
    console.log('Serveris veikia http://localhost:3000');
});
