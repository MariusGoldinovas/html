// Funkcija, kuri grąžina atsitiktinį skaičių tarp min ir max reikšmių (įskaitant abu)
function random(min, max) {
  const minCeiled = Math.ceil(min); // Suapvalina min reikšmę į viršų
  const maxFloored = Math.floor(max); // Suapvalina max reikšmę žemyn
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // Grąžina atsitiktinį skaičių tarp minCeiled ir maxFloored
}

const colors = ["blue", "purple", "red", "white", "yellow", "orange"]; // Galimų spalvų masyvas
let rounds = 10; // Bendras žaidimo raundų skaičius
let time = 30; // Kiekvieno raundo trukmė sekundėmis
let onTarget = 0; // Žaidėjo paspaudimų skaičius (pataikymų)
let sec = 0; // Sekundžių skaitiklis
let hitsTotal = time; // Iš viso galimų pataikymų per raundą
let currentRound  = 1; // Dabartinis raundas
let resultsArray = []; // Masyvas, kuriame bus saugomi rezultatai po kiekvieno raundo

// Funkcija, kuri vykdoma paspaudus ant objekto
function paspaudimas() {
  onTarget++; // Padidina pataikymų skaičių
}

// Nustatomas laikmatis, kuris vykdo funkciją kas 1000ms (1 sekundę)
const laikmatis = setInterval(timer, 1000);

// Funkcija, kuri skaičiuoja laiką ir keičia objekto padėtį bei spalvą
function timer() {
  if (sec < time) { // Jei laikas dar nepraėjo
    sec++; // Didina sekundžių skaitiklį
    document.querySelector(".time").textContent = `${sec} s`; // Rodo dabartinį laiką ekrane

    // Atsitiktinai nustatoma nauja objekto pozicija
    let left = random(0, 450);
    let top = random(0, 450);

    const box = document.querySelector(".box"); // Paima elementą su klase "box"
    let randomColor = colors[random(0, colors.length - 1)]; // Pasirenka atsitiktinę spalvą
    box.style.backgroundColor = randomColor; // Pakeičia objekto spalvą

    // Pakeičia objekto poziciją ekrane
    box.style.top = `${top}px`;
    box.style.left = `${left}px`;
  } else if (sec === time) { // Jei laikas pasibaigė
    win(); // Vykdo win() funkciją
  }
}

// Funkcija, kuri vykdoma pasibaigus raundui (kai laikas baigiasi)
function win() {
    let result;
    // Tikrina, ar žaidėjas laimėjo, pralaimėjo, ar buvo lygiosios
    if (onTarget > hitsTotal / 2) {
      result = `Game ${currentRound}: You win! <br> Your points: ${onTarget}, PC points: ${hitsTotal - onTarget}`;
    } else if (onTarget === hitsTotal / 2) {
      result = `Game ${currentRound}: We are the winners! <br>  Your points: ${onTarget}, PC points: ${hitsTotal - onTarget}`;
    } else {
      result = `Game ${currentRound}: You lose loser! <br> Your points: ${onTarget}, PC points: ${hitsTotal - onTarget}`;
    }

    // Prideda raundo rezultatą į masyvą
    resultsArray.push(result);
    console.log(resultsArray);
    // Prideda rezultatą į HTML elementą su klase "left"
    document.querySelector(".left").innerHTML += result + '<br>';

    // Tikrina, ar yra daugiau raundų
    if (currentRound < rounds) {
      currentRound++; // Padidina raundų skaitiklį
      resetGame(); // Atstato žaidimo būseną kitam raundui
    } else {
      clearInterval(laikmatis); // Sustabdo laikmatį, jei žaidimas baigtas
      document.querySelector(".results").innerHTML = `Game Over!<br>${resultsArray.join('<br>')}`; // Rodo visų raundų rezultatus
      document.querySelector(".right").innerHTML =`Game Over`; // Nurodo, kad žaidimas baigtas
    }
}

// Funkcija, kuri atstato žaidimo būseną naujam raundui
function resetGame() {
  sec = 0; // Atstato laikmatį
  onTarget = 0; // Atstato pataikymų skaičių
  hitsTotal = time; // Atstato bendrą galimų pataikymų skaičių
  document.querySelector(".time").textContent = `${sec} s`; // Nustato pradinį laiko rodymą
  document.querySelector(".results").textContent = ''; // Išvalo rezultatų ekraną
}
