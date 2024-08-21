function random(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

document.write('<h1>Pirma užduotis</h1>');
// Naršyklėje nupieškite linija iš 400 “*”. 
// Naudodami css stilių “suskaldykite” liniją taip, kad visos žvaigždutės matytusi ekrane;
// Programiškai “suskaldykite” žvaigždutes taip, kad vienoje eilutėje nebūtų daugiau nei 50 “*”; 

for(let i = 1; i <= 400; i++) {
    document.write('*');
    if (i % 50 === 0) {
        document.write('<br>'); 
    }
}
document.write('<h1>Antra užduotis</h1>');
<h1></h1>
// Sugeneruokite 300 atsitiktinių skaičių nuo 0 iki 300, atspausdinkite juos atskirtus tarpais ir suskaičiuokite kiek tarp jų yra didesnių už 150.  Skaičiai didesni nei 275 turi būti raudonos spalvos.

let a2 = 0;
let numbers = 0;
let counter = 0;
let red = 0;

while(a2 < 300){
    numbers = random(0, 300)
    if(numbers > 150){
        counter++;
    }
    if(numbers > 275){
        red++
        document.write(`<span style="color:red; "> ${numbers} </span>`);
    } else {
        document.write(numbers + " ");
    }
    a2++
}
document.write(`<br>Didesnių nei 150 skaičių yra ${counter} vnt`);
document.write(`<br>Didesnių nei 275 skaičių yra ${red} vnt`)


document.write('<h1>Trečia užduotis</h1>');

// Vienoje eilutėje atspausdinkite visus skaičius nuo 1 iki 3000, kurie dalijasi iš 77 be liekanos. Skaičius atskirkite kableliais. Po paskutinio skaičiaus kablelio neturi būti. Jeigu reikia, panaudokite css, kad visi rezultatai matytusi ekrane.

let beLiekanos = 0; 
let a3 = 0;
let sarasas = '';

for(let i = 1; i < 3000; i++) {
    if(i % 77 === 0){
        beLiekanos++
        sarasas += a3 + ",";
    }
}
if (sarasas.endsWith(",")) {
    sarasas = sarasas.slice(0, -1);
}
document.write(sarasas);
document.write(`<br>Skaičių kurie dalinasi iš 77 yra ${beLiekanos} vnt`);

document.write('<h1>Ketvirta užduotis</h1>');
// Nupieškite kvadratą iš “*”, kurio kraštinės sudaro 100 “*”. Panaudokite css stilių, kad kvadratas ekrane atrodytų kvadratinis. (Priskirkite reikiamą eilučių aukštį)
// * * * * * * * * * * *
// * * * * * * * * * * *
// * * * * * * * * * * *
// * * * * * * * * * * *
// * * * * * * * * * * *
// * * * * * * * * * * *
// * * * * * * * * * * *

let size = 25;

for(let y = 0; y < size; y++) {
    for(let x = 0; x < size; x++) {
        if(y === x){
            document.write('<span class="red">*</span>');
        } else if(y + x === size - 1) {
            document.write('<span class="red">*</span>');
        } else {
            document.write('<span class="space">*</span>');
        }        
    }
    document.write('<br>');
}

document.write('<h1>Penkta užduotis</h1>');
// Prieš tai nupieštam kvadratui nupieškite raudonas istrižaines.

document.write('<h1>Šešta užduotis</h1>');
//Metam monetą. Monetos kritimo rezultatą imituojam rand() funkcija, kur 0 yra herbas, o 1 - skaičius. Monetos metimo rezultatus išvedame į ekraną atskiroje eilutėje: “S” jeigu iškrito skaičius ir “H” jeigu herbas. Suprogramuokite tris skirtingus scenarijus kai monetos metimą stabdome:
// Iškritus herbui;
// Tris kartus iškritus herbui;
// Tris kartus iš eilės iškritus herbui;

let count = 0;

document.write("<h3>Iškritus herbui:</h3> <br>");
while(true) {
    moneta = Math.round(Math.random())
       if(moneta === 1) {
        document.write("Let`s play again.<br>");
    } else {
        document.write("<strong>We have a winner!!!. Game over</strong>");
        break;
    }
}

document.write("<h3>Tris kartus iškritus herbui:</h3> <br>");
while(true) {
    moneta = Math.round(Math.random())
    if(moneta === 1) {
        document.write("We have S.<br>");
    } else {
        document.write("We have H.<br>");
        count++;
    }
    if(count === 3) {
        document.write("<strong>You have 3 H !! Game over</strong>");
        break;
    }
}

document.write("<h3>Tris kartus iš eilės iškritus herbui:</h3> <br>");
while(true) {
    moneta = Math.round(Math.random())
    if(moneta === 1) {
        document.write("We have S.<br>");
        count = 0;
    } else {
        document.write("We have H.<br>");
        count++;
    }
    if(count === 3) {
        document.write("<strong>3 in a row H !! take all my money!</strong>");
        break;
    }
}

document.write('<h1>Septinta užduotis</h1>');
// Kazys ir Petras žaidžiai šaškėm. Petras surenka taškų kiekį nuo 10 iki 20, Kazys surenka taškų kiekį nuo 5 iki 25. Vienoje eilutėje išvesti žaidėjų vardus su taškų kiekiu ir “Partiją laimėjo: ​laimėtojo vardas​”. Taškų kiekį generuokite funkcija ​rand()​. Žaidimą laimi tas, kas greičiau surenka 222 taškus. Partijas kartoti tol, kol kažkuris žaidėjas pirmas surenka 222 arba daugiau taškų.

let PetrasTotalPoints = 0;
let KazysTotalPoints = 0;

while(true) {
    let PetrasPoints = random(10, 20);
    let KazysPoints = random(5, 25)

    document.write(`Petras turi ${PetrasPoints} taškų, Kazys turi ${KazysPoints} taškus.<br>`);
    if(PetrasPoints > KazysPoints){
        document.write(`Partiją laimėjo: Petras<br>`)
    } else if (PetrasPoints < KazysPoints) {
        document.write(`Partiją laimėjo: Kazys<br>`)
    } else {
        document.write(`Laimi draugystė<br>`)
    }

    PetrasTotalPoints += PetrasPoints;
    KazysTotalPoints += KazysPoints;

    if (PetrasTotalPoints >= 222 && PetrasTotalPoints > KazysTotalPoints) {
        document.write(`<strong>Petras laimi žaidimą su ${PetrasTotalPoints} taškais!</strong>`);
        break;
    } else if (KazysTotalPoints >= 222 && KazysTotalPoints > PetrasTotalPoints) {
        document.write(`<strong>Kazys laimi žaidimą su ${KazysTotalPoints} taškais!</strong>`);
        break;
    } else {
        document.write(`Laimi draugystė<br>`)
    }
}

document.write('<h1>Aštunta užduotis</h1>');

// Sumodeliuokite vinies kalimą. Įkalimo gylį sumodeliuokite pasinaudodami rand() funkcija. Vinies ilgis 8.5cm (pilnai sulenda į lentą).
// “Įkalkite” 5 vinis mažais smūgiais. Vienas smūgis vinį įkala 5-20 mm. Suskaičiuokite kiek reikia smūgių.
// “Įkalkite” 5 vinis dideliais smūgiais. Vienas smūgis vinį įkala 20-30 mm, bet yra 50% tikimybė (pasinaudokite rand() funkcija tikimybei sumodeliuoti), kad smūgis nepataikys į vinį. Suskaičiuokite kiek reikia smūgių.

let vieniesIlgis = 85;
let mazasSmugis = 0;
let total = 0;
let didelisSmugis = 0;

for(let i = 1; i <= 5; i++){
    document.write(i + " kalama vinis<br>")
    let dabartinisIlgis = vieniesIlgis

    while(true){
        let smugis = random(5, 20);
        dabartinisIlgis -= smugis;
        mazasSmugis++;
        document.write(` ${mazasSmugis} smūgis sukala ${smugis} mm,<br> `)

        total += smugis

        if (dabartinisIlgis <= 0) {
            document.write(`<strong>Iš viso ${mazasSmugis} smūgių, ${total} mm</strong><br>`)
            mazasSmugis = 0;
            total = 0;
            break;
        }
    }
}

document.write('<h1>-------------</h1>');

for(let i = 1; i <= 5; i++){
    document.write(i + " kalama vinis<br>")
    let dabartinisIlgis = vieniesIlgis

    while(true){
        let smugis = random(20, 30);
        let onTarget = random(0, 1);
        if(onTarget === 1){
            dabartinisIlgis -= smugis;
            mazasSmugis++;
            document.write(` ${didelisSmugis} smūgis sukala ${smugis} mm,<br> `)

            total += smugis

            if (dabartinisIlgis <= 0) {
                document.write(`<strong>Iš viso ${didelisSmugis} smūgių, ${total} mm</strong><br>`)
                mazasSmugis = 0;
                total = 0;
                break;
            }
        } else {
            document.write(` Nepataikei<br> `)
        }
    }
}

document.write('<h1>Papildoma kančia</h1>');

// Sugeneruokite stringą, kurį sudarytų 50 atsitiktinių skaičių nuo 1 iki 200, atskirtų tarpais. Skaičiai turi būti unikalūs (t.y. nesikartoti). Sugeneruokite antrą stringą, pasinaudodami pirmu, palikdami jame tik pirminius skaičius (t.y tokius, kurie dalinasi be liekanos tik iš 1 ir patys savęs). Skaičius stringe sudėliokite didėjimo tvarka, nuo mažiausio iki didžiausio.

let skaiciai = [];
let pirminiai = [];



for(let i = 1; i < 200; i++){
    skaiciai.push(i)
}

//Fisher-Yates shuffle algorithm
for(let i = skaiciai.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [skaiciai[i], skaiciai[j]] = [skaiciai[j], skaiciai[i]]; // Swap elements
}

skaiciai = skaiciai.join(" ");

document.write(`<strong>Visi skaičiai random: </strong><br>${skaiciai}<br>`);
// Split the string back into an array and convert each element to a number
skaiciai = skaiciai.split(" ").map(Number);

// Iterate through the shuffled array to find prime numbers
for(let i = 0; i < skaiciai.length; i++){
    let num = skaiciai[i];
    let isPrime = true;

    // ar skaičius pirminis
    if (num < 2) {
        isPrime = false; 
    } else {
        for (let j = 2; j <= Math.sqrt(num); j++) {
            if (num % j === 0) {
                isPrime = false;
                break;
            }
        }
    }
    if (isPrime) {
        pirminiai.push(num);
    }
}

document.write(`<br><strong>Pirminiai skaičiai:</strong> <br> ${pirminiai}<br>`);
document.write(`<br><strong>Pirminiai skaičiai didėjimo tvarka:</strong> <br> ${pirminiai.sort((a, b) => a - b)}<br>`);

    
    




