function random(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// ----------------------------------

document.querySelector(".blue").addEventListener("click", () => {
  document.body.style.backgroundColor = "blue";
});
document.querySelector(".red").addEventListener("click", () => {
  document.body.style.backgroundColor = "red";
});
document.querySelector(".white").addEventListener("click", () => {
  document.body.style.backgroundColor = "white";
});

// ----------------------------------
let lucky = random(0, 100);
let ballNumbers = [];

function ballRandom() {
  let randomNumber = random(0, 100);
  ballNumbers.push(randomNumber);

 let kamuoliukai = "";
  for (const number of ballNumbers) {
    if (number === lucky)
      document.querySelector(".teleloto").innerHTML = `<div class="start">Skambutis !!! Laimėjo skaičius ${lucky} !!!!</div>`
    if (number >= 0 && number <= 19 ) {
        kamuoliukai += `<div class="ball black-ball">${number}</div>`;
    }else if (number >= 20 && number <= 39) {
        kamuoliukai += `<div class="ball yellow-ball">${number}</div>`;  
    }else if (number >= 40 && number <= 59) {
        kamuoliukai += `<div class="ball red-ball">${number}</div>`; 
    }else if (number >= 60 && number <= 79) {
        kamuoliukai += `<div class="ball blue-ball">${number}</div>`; 
    }else if (number >= 80 && number <= 100) {
        kamuoliukai += `<div class="ball green-ball">${number}</div>`; 
    }
  }
  document.querySelector(".balls").innerHTML = kamuoliukai;
}
