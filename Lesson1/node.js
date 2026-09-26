/*console.log(2+2);
document.querySelector("h1").textContent = "JS";
/*window.location
window.history;

const name = "John";
const Name = */
//const price = 100;
//const quantity = 3;
//const total = price * quantity;
console.log();

let score = 0;
score = 10;
var name = "NULL";

name = prompt("Who are you?");
alert("Hello! " + name);

/*
const number1 = Number(prompt("enter first num"));
const number2 = Number(prompt("enter second num"));
alert(number1+number2);
console.log(typeof number);


const price = Number(prompt("How much dose coffee cost?"));
const quantity = Number(prompt("how many coffee cost"));
alert(price*quantity);*/
/*
const miles_per_km = 0.631;
const km = Number(prompt("enter length"));
const miles = km * miles_per_km;
alert(`${km} km -> miles ${miles.toFixed(2)}`);*/

const current_year = 2026;
const from = Number(prompt("enter birth year"));
const age = current_year - from;
if(from <= 0){
    alert(`Age must be >0`);
}
alert(`Your age = ${age}`);

const points_per_unit = 12;
const money = Number(prompt("enter amount of units"));
alert(`your points ${money*points_per_unit}`);


const gb_to_mb = 1024;
const video_size = 500;
const storage = Number(prompt("enter storage capacity"));
const total_q_ty = Math.floor((storage*gb_to_mb)/video_size);
alert("total files" + total_q_ty); 

const budget = 1000;
const ticket_price = 180;
const tickets = Math.floor(budget/price);
const change = budget % ticket_price;

number %2 ===0;