function random(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

document.write(`<h1> Lengvesni </h1>`)
document.write(`<h3> Pirma užduotis</h3>`)
// Sukurkite masyvą iš dešimties augalų pavadinimų.

const augalai = ["Aguona", "Grikis", "Apynys", "Balanda", "Kaštonas","Beržas", "Bijūnas", "Česnakas", "Čiobrelis","Kadagys" ];
document.write(augalai)

document.write(`<h3> Antra užduotis</h3>`)
// Atspausdinkite kiekvieną pirmo uždavinio augalą atskiroje eilutėje.

for(let i = 0; i < augalai.length; i++){
    document.write(` Nr.${i} - ${augalai[i]}<br>`)
}

document.write(`<h3> Trečia užduotis</h3>`)
// Atspausdinkite pirmo uždavinio kiekvieną augalą pradedant nuo paskutinio, ir baigiant pirmuoju. (atvirkščias ciklas).

const aukstynKojom = augalai.reverse()
document.write(aukstynKojom)

document.write(`<h3> Ketvirta užduotis</h3>`)
// Suskaičiuokite kiek pirmo uždavinio masyve yra žodžių trumpesnių nei 5 simboliai, ir kiek ilgesnių nei 7 simboliai. 

let trumpesniNei5 = 0;
let ilgesniNei7 = 0;

for(let i = 0; i < augalai.length; i++)
    if(augalai[i].length < 5) {
        trumpesniNei5++
    }
    document.write(`Trumpesni nei 5 simboliai yra ${trumpesniNei5} <br>`);

for(let i = 0; i < augalai.length; i++)
    if(augalai[i].length > 7) {
        ilgesniNei7++
    }
    document.write(`Ilgesni nei 7 simboliai yra ${ilgesniNei7}<br>`);

document.write(`<h3> Penkta užduotis</h3>`)
// Suskaičiuokite kiek pirmo uždavinio masyve yra žodžių ilgesnių nei 5 simboliai bet trumpesnių  nei 10 simboliai. 

let viduriukas = 0;

for(let i = 0; i < augalai.length; i++)
    if(augalai[i].length > 5 && augalai[i].length < 10 ) {
        viduriukas++
    }
    document.write(`Ilgesni nei 5 simboliai bet trumpesni nei 10 simbolių yra ${viduriukas} žodžių<br>`);


document.write(`<h1> Sunkesni </h1>`)
document.write(`<h3> Pirma užduotis </h3>`)
// Sugeneruokite masyvą iš 30 elementų (indeksai nuo 0 iki 29), kurių reikšmės yra atsitiktiniai skaičiai nuo 5 iki 25.

const atsitiktinisMasyvas = [];

for(let i = 0; i < 30; i++) {
    atsitiktinisMasyvas[i] = random(5, 25)
}
document.write(atsitiktinisMasyvas)

document.write(`<h3> Antra užduotis a. </h3>`)
// Suskaičiuokite kiek masyve yra reikšmių didesnių už 10;

let daugiauUz10 = 0;

for(let i = 0; i < atsitiktinisMasyvas.length; i++) {
    if(atsitiktinisMasyvas[i] > 10) {
        daugiauUz10++
    }
}
document.write(daugiauUz10)

document.write(`<h3> Antra užduotis b. </h3>`)
// Raskite didžiausią masyvo reikšmę ir jos indeksą arba indeksus jeigu yra keli;

let SkaiciusDidziausias = Math.max(...atsitiktinisMasyvas);

for(let i = 0; i < atsitiktinisMasyvas.length; i++) {
    if(SkaiciusDidziausias === atsitiktinisMasyvas[i]) {
        document.write(`<br> Skaičius didžiausias yra ${SkaiciusDidziausias} jo vieta:${i}`) 
    }
}

document.write(`<h3> Antra užduotis c. </h3>`)
// Suskaičiuokite visų porinių (lyginių) indeksų reikšmių sumą;

let poriniusSuma = 0;

for(let i = 0; i < atsitiktinisMasyvas.length; i++) {
    if( i%2 === 0){
        poriniusSuma += atsitiktinisMasyvas[i]
    }
}
document.write(`Porinių suma yra: ${poriniusSuma}`)

document.write(`<h3> Antra užduotis d. </h3>`)
// Sukurkite naują masyvą, kurio reikšmės yra 1 uždavinio masyvo reikšmes minus tos reikšmės indeksas;

const newMasyvas = [];

for(let i = 0; i < atsitiktinisMasyvas.length; i++){
    newMasyvas.push(atsitiktinisMasyvas[i] - i)
}

document.write(`Naujas masyvas: ${newMasyvas}`)

document.write(`<h3> Antra užduotis e. </h3>`)
// Papildykite masyvą papildomais 10 elementų su reikšmėmis nuo 5 iki 25, kad bendras masyvas padidėtų iki indekso 39;

for(let i = 1; i < 10; i++){
    newNUmbers = random(5,25)
    atsitiktinisMasyvas.push(newNUmbers)

}
document.write(`Papildymas: ${atsitiktinisMasyvas} <br>Ilgis: ${atsitiktinisMasyvas.length}`)

document.write(`<h3> Antra užduotis f. </h3>`)
// Iš masyvo elementų sukurkite du naujus masyvus. Vienas turi būti sudarytas iš neporinių indeksų reikšmių, o kitas iš porinių;

const poriniai = [];
const neporiniai = [];

for ( let i = 0; i < atsitiktinisMasyvas.length; i++){
    if(atsitiktinisMasyvas.indexOf(atsitiktinisMasyvas[i])% 2 === 0){
        poriniai.push(atsitiktinisMasyvas[i])
    }else {
        neporiniai.push(atsitiktinisMasyvas[i])
    }
}
document.write(`Poriniai: ${poriniai} <br> Neporiniai: ${neporiniai}`)

// document.write(`<h3> Antra užduotis g. </h3>`)
// // Pirminio masyvo elementus su poriniais indeksais padarykite lygius 0 jeigu jie didesni už 15;

for ( let i = 0; i < atsitiktinisMasyvas.length; i++){
    if(atsitiktinisMasyvas[i] % 2 === 0 && atsitiktinisMasyvas[i] >15 ){
        atsitiktinisMasyvas[i] = 0
    }
}
document.write(`Poriniai: ${atsitiktinisMasyvas}`)

document.write(`<h3> Antra užduotis h. </h3>`)
// Suraskite pirmą indeksą, kurio elemento reikšmė didesnė už 10;
for ( let i = 0; i < atsitiktinisMasyvas.length; i++){
    if(atsitiktinisMasyvas[i] > 10 ){      
        document.write(`Daugiau už 10 yra ${atsitiktinisMasyvas[i]}, jo indeksas: ${atsitiktinisMasyvas.indexOf(atsitiktinisMasyvas[i])}`)
        break;
    }
}

document.write(`<h3> Antra užduotis i. </h3>`)
// Sukurkite naują masyvą iš jo pašalinę visus elementus turinčius porinį indeksą;

const bePoriniuMasyvas = [];

for ( let i = 0; i < atsitiktinisMasyvas.length; i++){
    if(atsitiktinisMasyvas.indexOf(atsitiktinisMasyvas[i])% 2 !== 0){
        bePoriniuMasyvas.push(atsitiktinisMasyvas[i])  
}
}
document.write(`: ${bePoriniuMasyvas}`)

