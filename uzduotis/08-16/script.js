function random(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
console.log("Pirma užduotis");

// Sukurti du kintamuosius. Jiems priskirti savo mylimo aktoriaus vardą ir pavardę kaip stringus (Jonas Jonaitis). Atspausdinti trumpesnį stringą.
// Pvz:
// Johnny Depp
// Rezultatas: Depp

let name = "Jonas";
let surname = "Jonaitis";

if (name.length < surname.length) {
    console.log(name)
} else {
    console.log(surname)
}

console.log("Antra užduotis");

// Sukurti du kintamuosius. Jiems priskirti savo mylimo aktoriaus vardą ir pavardę kaip stringus. Vardą atspausdinti tik didžiosiom raidėm, o pavardę tik mažosioms.
// Rezultatas: JOHNNY depp

console.log(name.toUpperCase(), surname.toLowerCase());

console.log("Trečia užduotis");

// Sukurti du kintamuosius. Jiems priskirti savo mylimo aktoriaus vardą ir pavardę kaip stringus. Sukurti trečią kintamąjį ir jam priskirti stringą, sudarytą iš pirmų vardo ir pavardės kintamųjų raidžių. Jį atspausdinti.
// Rezultatas: JD

let short = name[0] + surname[0];

console.log(short);

console.log("Ketvirta užduotis");

// Sukurti du kintamuosius. Jiems priskirti savo mylimo aktoriaus vardą ir pavardę kaip stringus. Sukurti trečią kintamąjį ir jam priskirti stringą, sudarytą iš trijų paskutinių vardo ir pavardės kintamųjų raidžių. Jį atspausdinti.
// Rezultatas: NNYEPP

let mix = name.slice(-3) + surname.slice(-3)

console.log(mix.toUpperCase());

console.log("Penkta užduotis");

// Sukurti kintamąjį su stringu: “An American in Paris”. Jame visas “a” (didžiąsias ir mažąsias) pakeisti žvaigždutėm “*”.  Rezultatą atspausdinti.
// Rezultatas: *n *meric*n in P*ris

let sentence = "An American in Paris"
let sentenceLow = sentence.toLowerCase()

console.log(sentenceLow.replaceAll("a", "*"));

console.log("Šešta užduotis");

// Sukurti kintamąjį su stringu: “An American in Paris”. Suskaičiuoti visas “a” (didžiąsias ir mažąsias) raides. Rezultatą atspausdinti.
// Rezultatas: 4
let regex = /A/gi;
let  found = sentence.match(regex);

console.log(found.length);


console.log("Septinta užduotis");
// Sukurti kintamąjį su stringu: “An American in Paris”. Jame ištrinti visas balses. Rezultatą atspausdinti. Kodą pakartoti su stringais: “Breakfast at Tiffany's”, “2001: A Space Odyssey” ir “It's a Wonderful Life”.
//  /a/, /e/, /i/, /y/, /o/, /u/;
let sentence1 = 'An American in Paris'
sentence1 = sentence1.replace(/[aeiyou]/gi, '');
console.log(sentence1);

let sentence2 = "Breakfast at Tiffany's"
sentence2 = sentence2.replace(/[aeiyou]/gi, '');
console.log(sentence2);

let sentence3 = '2001: A Space Odyssey'
sentence3 = sentence3.replace(/[aeiyou]/gi, '');
console.log(sentence3);

let sentence4 = "It's a Wonderful Life"
sentence4 = sentence4.replace(/[aeiyou]/gi, '');
console.log(sentence4);


console.log("Aštunta užduotis");
// Stringe, kurį generuoja toks kodas: `Star Wars: Episode ${random(0,5)} ${random(1,9)} - A New Hope`; Surasti ir atspausdinti epizodo numerį.
// Rezultatas: 5 9

let str = `Star Wars: Episode ${random(0,5)} ${random(1,9)} - A New Hope`

console.log(str)
console.log(str.slice(19,23));


console.log("Devinta užduotis");
// Parašyti kodą, kuris generuotų atsitiktinį stringą iš lotyniškų mažųjų raidžių. Stringo ilgis 3 simboliai.
// Rezultatas: jkr

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let letter1 = letters[random(0, letters.length-1)];
console.log(letter1);
let letter2 = letters[random(0, letters.length-1)];
console.log(letter2);
let letter3 = letters[random(0, letters.length-1)];
console.log(letter3);
let result = letter1+letter2+letter3
console.log(result.toLowerCase());
