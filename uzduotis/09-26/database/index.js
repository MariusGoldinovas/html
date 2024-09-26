import express from 'express';
import { readFile, writeFile, appendFile, rm } from 'fs/promises';

const app = express();

app.use(express.urlencoded({ extended: true }));

const inputFile = './U2.txt'; 
const output = './U2rezultatai.txt';

app.get('/', async (req, res) => {
      const data = await readFile(inputFile, 'utf8');
      res.send(`<pre>${data}</pre>`);
  });

app.get('/results', async (req, res) => {
      const data = await readFile(output, 'utf8');
      res.send(`<pre>${data}</pre>`);
  });

app.put('/update', async (req, res) =>{
    const { pairName, techniqueScores, artistryScores } = req.body;
    let currentContent = await readFile(inputFile, 'utf8');
    currentContent = currentContent.trim();
    const formattedData = `\n${pairName}\n${techniqueScores}\n${artistryScores}\n`;
    await writeFile(inputFile, currentContent + formattedData, 'utf8');
    res.json('Rezultatai pridėti');
});

async function readInputData() {

    const data = await readFile(inputFile, 'utf8');
    const lines = data.trim().split('\n');

    const scores = [];

    for (let i = 0; i < lines.length; i += 3) {
        const pairName = lines[i] ? lines[i].trim() : null;
        const techniqueScores = lines[i + 1] ? lines[i + 1].split(' ').map(Number) : [];
        const artistryScores = lines[i + 2] ? lines[i + 2].split(' ').map(Number) : [];

      scores.push({
        pairName,
        techniqueScores,
        artistryScores
      });
    }

    return scores;
}

function calculateScore(scores) {
  return scores.map((pair) => {
    const { pairName, techniqueScores, artistryScores } = pair;

    const techniqueTotal = sumScores(techniqueScores);
    const artistryTotal = sumScores(artistryScores);

    const totalScore = techniqueTotal + artistryTotal;

    return {
      pairName,
      totalScore
    };
  });
}

function sumScores(scores) {
  scores.sort((a, b) => a - b); 
  const filteredScores = scores.slice(1, -1);
  return filteredScores.reduce((a, b) => a + b, 0);
}


async function writeOutputData(results) {
    results.sort((a, b) => b.totalScore - a.totalScore);

    let output = '';
    results.forEach(result => {
      output += `Pora:${result.pairName}\r\nRezultatas: ${result.totalScore}\r\n`;
    });

    await writeFile('U2rezultatai.txt', output);
    console.log('Results have been written to U2rezultatai.txt');
}


app.get('/calculate', async (req, res) => {
  const inputData = await readInputData();
  const results = calculateScore(inputData);
  await writeOutputData(results);
  res.send('Calculation complete. Check the output file.');
});

app.get('/delete', async (req, res) => {
  await rm ('U2rezultatai.txt');
  res.send('Calculation deleted. U2rezultatai.txt kaput');
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
