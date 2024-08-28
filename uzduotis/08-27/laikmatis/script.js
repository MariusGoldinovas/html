let hours = 24;
let min = 59;
let sec = 59;

let countInterval;
function startTimer() {
    countInterval = setInterval(skaiciavimas, 1000);
}

function skaiciavimas(){

    if(sec > 0){
        sec--;
    } else if(min > 0 && sec === 0){
        min--;
        sec = 59;
    } else if(hours > 0){
        hours--;
        min = 59;
        sec = 59;
    }

    document.querySelector(".hour").textContent = hours + " val";
    document.querySelector(".min").textContent = min + " min";
    document.querySelector(".sec").textContent = sec + " s";

    document.querySelector(".restart").addEventListener("click", () => {
        clearInterval(countInterval); 
        hours = 24;
        min = 59;
        sec = 60;  
        startTimer(); 
    });


    if(hours === 0 && min === 0 && sec === 0){
        clearInterval(countInterval);
        document.querySelector(".laikmatis").textContent = "Laikas baigėsi!";
    }
}

document.querySelector(".laikmatis").addEventListener("click", () => {
    startTimer()});

//chorono-------------------------------------------------

let laikmacioIntervalas;
function startChrono() {
    laikmacioIntervalas = setInterval(laikmatis, 1000);
}

    function laikmatis(){
        let sec = 0;
        let min = 0;
        let hours = 0;
        if (sec < 59) {
            sec++;
        } else {
            sec = 0;
            if (min < 59) {
                min++;
            } else {
                min = 0;
                hour++;
            }
        }
        
        // console.log(laikmatis);
        document.querySelector(".hour").textContent = hours + " val";
        document.querySelector(".min").textContent = min + " min";
        document.querySelector(".sec").textContent = sec + " s";
        // startChrono();
        document.querySelector(".chrono").addEventListener("click", () => {
            laikmatis()});
    }

        console.log(startChrono())