function random(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
// Pirma užduotis
console.log("1. -----------");

let name = "Marius"
let surname = "Goldinovas"
let birthYear = 1984
let todayYear = 2024
let IamYears = todayYear - birthYear

console.log (`"Aš esu ${name} ${surname}. Man yra beveik ${IamYears} metų".`)

// Antra užduotis 
console.log("2. -----------");

let firstNumber = random(0,4)
let secondNumber = random(0,4)
console.log(firstNumber, secondNumber);


if (firstNumber > secondNumber) {
    console.log(Math.round(firstNumber / secondNumber));  
} else if (secondNumber > firstNumber) {
    console.log(Math.round(secondNumber / firstNumber)); 
        } else {
            console.log("Skaičiai yra lygūs");   
        }

// Trečia užduotis 
console.log("3. -----------");

let a = random(0,25);
let b = random(0,25);
let c = random(0,25);
console.log(a, b, c);



// if (a > b & a > c & b > c  ) {
//     console.log(b);
// } else if (b >  a & b > c & a > c ) {
//     console.log(a);
// } else if (a > b & c < b | a > b & c < a ){
//     console.log(c);
// } else if (a == 0 | b == 0 | c == 0) {
//     console.log("Kažkuris skaičius 0");
// }else if (a === b | b === c | c === a | a === b ) {
//     console.log("Kažkurie du skaičiai vienodi");
// }


// Ketvirta užduotis 
console.log("4. -----------");

let one = random(0,2);
let two = random(0,2);
let three = random(0,2);
let four = random(0,2);

let zeros = 0;
let ones = 0;
let twos = 0;

console.log(one, two, three, four);

// count 0 
if (one === 0) {
    zeros++;
}
if (two === 0) {
    zeros++;
}
if (three === 0) {
    zeros++;
}
if (four === 0) {
    zeros++;
}
//count 1
if (one === 1) {
    ones++;
}
if (two === 1) {
    ones++;
}
if (three === 1) {
    ones++;
}
if (four === 1) {
    ones++;
}
//count 2
if (one === 2) {
    twos++;
}
if (two === 2) {
    twos++;
}
if (three === 2) {
    twos++;
}
if (four === 2) {
    twos++;
}

console.log(`Turime 0 = ${zeros}, 1 = ${ones}, 2 = ${twos}`);

// Penkta užduotis 
console.log("5. -----------");

let a1 = random(-10,10)
let b1 = random(-10,10)
let c1 = random(-10,10)

console.log(a1, b1, c1);

if (a1<0) {
    console.log(`[${a1}]`);   
} else if (a1>0) {
    console.log(`{${a1}}`);    
} else {
    console.log(`(${a1})`); 
}
if (b1<0) {
    console.log(`[${b1}]`);   
} else if (b1>0) {
    console.log(`{${b1}}`);    
} else {
    console.log(`(${b1})`); 
}
if (c1<0) {
    console.log(`[${c1}]`);   
} else if (c1>0) {
    console.log(`{${c1}}`);    
} else {
    console.log(`(${c1})`); 
}

// šešta užduotis 
console.log("6. -----------");

let quantity = random(5,3000);
let price = 1; 
let discount3 = 3/100
let discount4 = 4/100

if (quantity > 1000 & quantity < 2000) {
    console.log(`Perkant ${quantity} žvakių taikoma 3% nuolaida, mokėtina suma be nuolaidos yra ${(quantity*price)}e, nuolaida ${(quantity*discount3)}e pritaikius nuolaidą ${(quantity*price)-(quantity*discount3)}e`);
    
} else if (quantity > 2000) {
    console.log(`Perkant ${quantity} žvakių taikoma 4% nuolaida, mokėtina suma be nuolaidos yra ${(quantity*price)}e, nuolaida ${(quantity*discount4)}e pritaikius nuolaidą ${(quantity*price)-(quantity*discount4)}e`);

} else {
    console.log( `Perkat ${quantity} žvakių nuolaida jums netaikoma, mokėtina suma: ${quantity*price}e` );
    
}

// Septinta užduotis 
console.log("7. -----------");

let a2 = random(0,100);
let b2 = random(0,100);
let c2 = random(0,100);

console.log(a2, b2, c2);

let average = (a2 + b2 + c2)/3

console.log(Math.round(average));
console.log(" -----------");

let a3= (a2 > 10 && a2 < 90) 
let b3= (b2 > 10 && b2 < 90) 
let c3= (c2 > 10 && c2 < 90) 
if (a3===true) {
    console.log(a2)
}
if (b3===true) {
    console.log(b2)
}
if (c3===true) {
    console.log(c2)
}  

if (a3===true&&b3===true&&c3===true) {
    console.log(`visų vidurkis: ${Math.round((a2 + b2 + c2)/3)}`)
} else if (a3===false&&b3===true&&c3===true) {
    console.log(`B ir C vidurkis: ${Math.round((b2 + c2)/2)}`)
} else if (a3===false&&b3===false&&c3===true) {
    console.log(`tinka tik C: ${c2}`)
} else if (a3===true&&b3===false&&c3===true) {
    console.log(`A ir C vidurkis: ${Math.round((a2 + c2)/2)}`)
} else if (a3===true&&b3===false&&c3===false) {
    console.log(`tinka tik A: ${a2}`)
} else if (a3===true&&b3===true&&c3===false) {
    console.log(`A ir B vidurkis: ${Math.round((a2 + b2)/2)}`)
} else if (a3===false&&b3===true&&c3===false) {
    console.log(`tinka tik B: ${b2}`)
} else if (a3===false&&b3===false&&c3===false) {
    console.log("skaiciai netinkami")
}


