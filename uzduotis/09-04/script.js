
class Televizorius {
    
    defaultChannel = 1;  
    defaultVolume = 50; 

    constructor(brand = "Sony"){
        this.brand = brand;
        this.channel = this.defaultChannel;
        this.volume = this.defaultVolume;
    }

    volumeUp(){
        if(this.volume < 100){
            this.volume++;
        }
    }

    volumeDown(){
        if(this.volume > 0){
            this.volume--;
        }
    }

    channelUp(){
        if(this.channel < 50){
            this.channel++;
        }else{
           return this.channel = 1;
        }
    }

    channelDown(){
        if(this.channel > 1){
            this.channel--;
        } 
    }

    setChannel(channel) {
        if (channel >= 1 && channel <= 50) {
            this.channel = channel;
        }
    }

    reset(){
        this.channel = this.defaultChannel;
        this.volume = this.defaultVolume;
    }
    onTV(){
        return `Televizorius ${this.brand} rodo kanalą: ${this.channel}, garsas ${this.volume}`;
    }
}
const televizorius = new Televizorius;


function updateScreen() {
    document.querySelector(".tv-screen").innerHTML = televizorius.onTV();
}



let firstPress;


let timer;


function pressButton(buttonNumber) {
    if (firstPress === undefined) {
        firstPress = buttonNumber;
        
        timer = setTimeout(() => {
            televizorius.setChannel(firstPress);
            updateScreen();
            firstPress = undefined;
        }, 1000);
        
    } else {
        const channel = firstPress.toString() + buttonNumber.toString();
        televizorius.setChannel(channel);
        updateScreen();  

        firstPress = undefined;
        clearTimeout(timer);
    }
}

function button0() { pressButton(0); }
function button1() { pressButton(1); }
function button2() { pressButton(2); }
function button3() { pressButton(3); }
function button4() { pressButton(4); }
function button5() { pressButton(5); }
function button6() { pressButton(6); }
function button7() { pressButton(7); }
function button8() { pressButton(8); }
function button9() { pressButton(9); }

