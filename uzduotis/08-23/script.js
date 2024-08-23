function random(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

document.write(`<strong> Sugeneruokite masyvą iš 30 elementų (indeksai nuo 0 iki 29), kurių reikšmės yra atsitiktiniai skaičiai nuo 5 iki 25 :<br><br></strong>`)

const masyvas = [];

for(let i = 0; i < 29; i++){
    masyvas[i] = random(5, 25)
   }
document.write(`${masyvas} <br>`)

document.write(`<strong><br>Suskaičiuokite kiek masyve yra reikšmių didesnių už 10;<br><br></strong>`)

let masyvasDaugiau10 = 0;

for(let i = 0; i <masyvas.length; i++){
    if(masyvas[i]>10) {
        masyvasDaugiau10++
    }
}
document.write(`${masyvasDaugiau10} <br>`)

document.write(`<strong><br>Raskite didžiausią masyvo reikšmę ir jos indeksą arba indeksus jeigu yra keli;<br><br></strong>`)

let maxReiksme = Math.max(...masyvas);

const maxIndex = [];
masyvas.forEach((value, index) => {
    if (value === maxReiksme) {
        maxIndex.push(index);
    }
});

if (maxIndex.length === 1) {
document.write(`max reikšmė: ${maxReiksme}, vieta indekse: ${maxIndex[0]}<br>`) 
} else {
    document.write(`max reikšmė: ${maxReiksme}, vieta indekse: ${maxIndex}<br>`)
}

document.write(`<strong><br>Suskaičiuokite visų porinių (lyginių) indeksų reikšmių sumą;<br><br></strong>`)

let suma = 0;

for (let i = 1; i < masyvas.length; i+=2) {
    suma += masyvas[i];
}
document.write(`Suma porinių: ${suma}<br>`)

document.write(`<strong><br>Sukurkite naują masyvą, kurio reikšmės yra 1 uždavinio masyvo reikšmes minus tos reikšmės indeksas;<br><br></strong>`)

const naujasMasyvas = [];

for (let i = 0; i < masyvas.length; i++) {
    naujaReiksme = masyvas[i] - i
    naujasMasyvas.push(naujaReiksme);
}
document.write(naujasMasyvas + '<br>')

document.write(`<strong><br>Papildykite masyvą papildomais 10 elementų su reikšmėmis nuo 5 iki 25, kad bendras masyvas padidėtų iki indekso 39;<br><br></strong>`)

for (let i = 0; i < 10; i++) {
    newNumbers = random(5, 25);
    masyvas.push(newNumbers)
}
document.write('naujas ilgis: ' + masyvas.length + '<br>')

document.write(`<strong><br>Iš masyvo elementų sukurkite du naujus masyvus. Vienas turi būti sudarytas iš neporinių indeksų reikšmių, o kitas iš porinių;<br><br></strong>`)
// Prie kur turėtų būti 0?
const PoriniaiIndexai = [];
const NePoriniaiIndexai = [];

for (let i = 0; i < masyvas.length; i++){
    if (i % 2 === 0 ) {
        PoriniaiIndexai.push(masyvas[i])
    } else {
        NePoriniaiIndexai.push(masyvas[i])
    }
}
document.write(`Poriniai indexai: ${PoriniaiIndexai},<br> Ne poriniai indexai: ${NePoriniaiIndexai} <br>`)

document.write(`<strong><br>Pirminio masyvo elementus su poriniais indeksais padarykite lygius 0 jeigu jie didesni už 15;<br><br></strong>`)

for (let i = 0; i < masyvas.length; i += 2) {
    if (masyvas[i] > 15) {
      masyvas[i] = 0;
    }
  }
  document.write(`${masyvas} <br>`)

  document.write(`<strong><br>Suraskite pirmą indeksą, kurio elemento reikšmė didesnė už 10;<br><br></strong>`)

  const found = masyvas.find((element) => element > 10);
 const vieta = masyvas.findIndex((element) => element === found);

  document.write(`elementas ${found}, vieta: ${vieta} <br>`)

  document.write(`<strong><br>Sukurkite naują masyvą iš jo pašalinę visus elementus turinčius porinį indeksą;<br><br></strong>`)

const NewMasyvas = [];

for (let i = 0; i < masyvas.length; i += 2) {
    NewMasyvas.push(masyvas[i])
}

document.write(`${NewMasyvas} <br>`)