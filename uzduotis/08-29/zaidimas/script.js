function random(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const colors = ["blue", "purple", "red", "white", "yellow", "orange"];
let rounds = 10;
let time = 30;
let onTarget = 0;
let sec = 0;
let hitsTotal = time;
let currentRound  = 1;
let resultsArray = [];


function paspaudimas() {
  onTarget++;
}

const laikmatis = setInterval(timer, 1000);

function timer() {
  if (sec < time) {
    sec++;
    document.querySelector(".time").textContent = `${sec} s`;
    let left = random(0, 450);
    let top = random(0, 550);

    const box = document.querySelector(".box");
    let randomColor = colors[random(0, colors.length - 1)];
     box.style.backgroundColor = randomColor;

    box.style.top = `${top}px`;
    box.style.left = `${left}px`;
  } else if(sec === time ) {
     win();
  }
}

function win() {
    let result;
    if (onTarget > hitsTotal / 2) {
      result = `Game ${currentRound}: You win! <br> Your points: ${onTarget}, PC points: ${hitsTotal - onTarget}`;
    } else if (onTarget === hitsTotal / 2) {
      result = `Game ${currentRound}: We are the winners! <br>  Your points: ${onTarget}, PC points: ${hitsTotal - onTarget}`;
    } else {
      result = `Game ${currentRound}: You lose loser! <br> Your points: ${onTarget}, PC points: ${hitsTotal - onTarget}`;
    }

resultsArray.push(result);
console.log(resultsArray)
document.querySelector(".left").innerHTML += result + '<br>';


if (currentRound < rounds) {
  currentRound++;
  resetGame();
} else {
  clearInterval(laikmatis);
  document.querySelector(".results").innerHTML = `Game Over!<br>${resultsArray.join('<br>')}`;
  document.querySelector(".right").innerHTML =`Game Over`;
}
}

function resetGame() {
sec = 0;
onTarget = 0;
hitsTotal = time;
document.querySelector(".time").textContent = `${sec} s`;
document.querySelector(".results").textContent = '';
}
