function random(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// Sukurkite laikmatį (timer) kuris rodytų mažėjančias sekundes, minutes bei valandas.
// Skaičiai generuojami rand() funkcija. Pasinaudokite setInterval() funkcija laiko atvaizdavimui.
// Pasibaigus laikui sustabdykite intervalą.

let hours = random(0, 23);
let min = random(0, 59);
let sec = random(1, 59);

const countInterval = setInterval(skaiciavimas, 1000);

function skaiciavimas() {
  if (sec > 0) {
    sec--;
  } else if (min > 0 && sec === 0) {
    min--;
    sec = 59;
  } else if (hours > 0) {
    hours--;
    min = 59;
    sec = 59;
  }

  if (min > 0 || sec > 0) {
    document.write(`${hours} valandų, ${min} min, ${sec < 10 ? "0" + sec : sec} s<br>`);
  }

  if (hours === 0 && minutes === 0 && seconds === 0){
    clearInterval(countInterval);
    document.write("Laikas baigėsi!");
  }
}
