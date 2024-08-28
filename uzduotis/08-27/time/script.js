let sec = 1;
let min = 0;
let hour = 0;

const intervalas = setInterval(skaiciavimas, 1000);

function skaiciavimas(){
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
    document.querySelector('.time').textContent = `${hour} h ${min} m ${sec} s`;
}


