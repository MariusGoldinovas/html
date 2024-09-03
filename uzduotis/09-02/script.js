function random(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }


const numbers = [0, 2, 4, 8, 16, 32, 64];

function randomNumbers(){
    const randomIndex = random(0, numbers.length - 1);
   let number = numbers[randomIndex];
    if(number === 0){
        return ''
    } else {
        return number
    }
}
randomNumbers();

function startNewGame() {
    let body = "";
    for(let i = 0; i < 16; i++){
        const num = randomNumbers();
        const color = getColor(num || 0);
        body +=
        `<div class="box" style="background-color: ${color};">${num}</div>`;
    }
    document.querySelector('.container').innerHTML = body;

}
startNewGame();

function getColor(value) {
    switch (value) {
        case 0: return '#cdc1b4';
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
    }
}

