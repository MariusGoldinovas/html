function random(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  
//   Sugeneruokite masyvą iš 10 elementų, kurio elementai būtų masyvai iš 5 elementų su reikšmėmis nuo 5 iki 25.

const masyvas = [];

for( let i = 0; i < 10; i++){
    masyvas[i] = [];
    for (let j = 0; j < 5; j++){
        masyvas[i][j] = random(5, 25)
    }
}

// console.log(masyvas)


// Suskaičiuokite kiek masyve yra elementų didesnių už 10;

const result = masyvas.flat().filter((number) => number > 10);
let kiekis = result.length
document.write(`${result} <br> Kiekis: ${kiekis}`)

// Raskite didžiausio elemento reikšmę;

let maxValue = Math.max(...masyvas.flat())
let vietaMasyve = masyvas.flat().indexOf(maxValue)

document.write(`<br> visas masyvas: ${masyvas.flat()}<br> max skaicisu ${maxValue} <br> vieta indekse: ${vietaMasyve}`)

// Suskaičiuokite kiekvieno antro lygio masyvų su vienodais indeksais sumas (t.y. suma reikšmių turinčių indeksą 0, 1 ir t.t.)

const vertikalusMasyvas = [];

for (let i = 0; i < masyvas[i].length; i++){
   let masyvuSuma = masyvas.reduce((sum, vidinisMasyvas) => sum + vidinisMasyvas[i], 0);
   vertikalusMasyvas.push(masyvuSuma)
}
document.write(`<br>Vertikali masyvų suma: ${vertikalusMasyvas}`)

//Visus antro lygio masyvus “pailginkite” iki 7 elementų

masyvas.forEach(innerArray => {
    innerArray.push(random(5, 25), random(5, 25));
});

// Suskaičiuokite kiekvieno iš antro lygio masyvų elementų sumą atskirai ir sumas panaudokite kaip reikšmes sukuriant naują masyvą. 
const naujasMasyvas = [];

for (let i = 0; i < masyvas.length; i++){
let sumaMasyvas = masyvas[i].reduce((sum,value) => sum + value, 0);
naujasMasyvas.push(sumaMasyvas)
}

document.write(`<br>Horizontali masyvų suma: ${naujasMasyvas}`)