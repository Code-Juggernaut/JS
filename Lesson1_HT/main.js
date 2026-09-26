//task1
const name = prompt("Hi! what's your name?");
alert(`Hello, ${name}!`);

//task2
const birth_year = prompt("Tell us when you were born");
alert(`Now you're ${2026-birth_year} old`);

//task3
let length = Number(prompt("Square length?"));
alert(`S = ${Math.pow(length,2)}`);
 
//task4
const radius = prompt("Circle radius?");
alert(`S = ${Math.PI*radius**2}`);

//task5
length = prompt("length between A and B")
const time = prompt("how much time do you have?");
const speed = length/time;
alert(`your speed should be ${speed}`);

//task6
const dolar_to_euro = 0.88;
const dolars = prompt("how much dolars do you wanna convert to euros?");
alert(`You will have ${dolars*dolar_to_euro} euros`);

//task7
const file_size = 840;//MB
const gb_to_mb = 1024;
const memory_volume = prompt("enter memory volume(Gb)");
const total_amount_of_files = Math.floor((memory_volume*gb_to_mb)/file_size);
alert(`total amount of files = ${total_amount_of_files}`);

//task8
const amount_of_money = prompt("how_much money do you have?");
const price_of_clocolate_bar = prompt("how much is one bar of chocolate?");
const total_amount_of_chocolate = Math.floor(amount_of_money/price_of_clocolate_bar);
const change = amount_of_money%price_of_clocolate_bar;
alert(`total amount of chocolate bars ${total_amount_of_chocolate} and change ${change}`);

//task9
let number = prompt("Enter your number (>=100 and <=999)");
const reversed_number = Math.floor(number/100) + (Math.floor(number%100/10))*10 + ((number%10)*100);
alert(`reversed number ${reversed_number}`);

//task10
number = prompt("Enter decimal number");
alert(`your number is ${number %2 ? "odd":"even"}`);
