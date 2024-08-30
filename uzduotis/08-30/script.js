let onTarget = 0;
let gameOver = false;
let winningPosition;

function paspaudimas() {
  let box = document.querySelectorAll(".box");
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", function () {
      if (!box.textContent && !gameOver) {
        // dėžė tusčia? zaidimas baigtas?
        onTarget++;
        if (onTarget % 2 !== 0) {
          box.textContent = "X";
          document.querySelector(".header").innerHTML = `0 player turn`;
        } else {
          box.textContent = "0";
          document.querySelector(".header").innerHTML = `X player turn`;
        }
        checkWinner();
      }
    });
  });
}

function checkWinner() {
  const boxes = [
    document.querySelector("#box1").textContent,
    document.querySelector("#box2").textContent,
    document.querySelector("#box3").textContent,
    document.querySelector("#box4").textContent,
    document.querySelector("#box5").textContent,
    document.querySelector("#box6").textContent,
    document.querySelector("#box7").textContent,
    document.querySelector("#box8").textContent,
    document.querySelector("#box9").textContent,
  ];
  const winningCombinations = [
    [0, 1, 2, 0], //row kombinacijos
    [3, 4, 5, 0],
    [6, 7, 8, 0],
    [0, 3, 6, 1], //cel kombinacijos
    [1, 4, 7, 1],
    [2, 5, 8, 1],
    [0, 4, 8, 2], //skersai kombinacijos
    [2, 4, 6, 2],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const header = document.querySelector(".header");

    const [a, b, c, d] = winningCombinations[i];
    if (boxes[a] === "X" && boxes[b] === "X" && boxes[c] === "X") {
      header.innerHTML = `Game Over!<br>"X wins!"`;
      gameOver = true;
      winningPosition = [a, b, c, d];
    }
    if (boxes[a] === "0" && boxes[b] === "0" && boxes[c] === "0") {
      header.innerHTML = `Game Over!<br>"0 wins!"`;
      gameOver = true;
      winningPosition = [a, b, c, d];
    }
  }

  if (gameOver) {
    const line = document.querySelector(".line");
    line.style.display = "block";

    if (winningPosition[3] == 0) {
      if (winningPosition[0] == 0) {
        line.style.top = "75px";
      } else if (winningPosition[0] == 3) {
        line.style.top = "225px";
      } else if (winningPosition[0] == 6) {
        line.style.top = "375px";
      }
    } else if (winningPosition[3] == 1) {
      if (winningPosition[0] == 0) {
        line.style.left = "-150px";
        line.style.top = "225px";
        line.style.transform = "rotate(90deg)";
      } else if (winningPosition[0] == 1) {
        line.style.left = "0px";
        line.style.transform = "rotate(90deg)";
      } else if (winningPosition[0] == 2) {
        line.style.left = "150px";
        line.style.transform = "rotate(90deg)";
      }
    } else if (winningPosition[3] == 2) {
      if (winningPosition[0] == 0) {
        line.style.top = "222px";
        line.style.transform = "rotate(45deg)";
      } else if (winningPosition[0] == 2) {
        line.style.top = "222px";
        line.style.transform = "rotate(-45deg)";
      }
    }
  }
}
