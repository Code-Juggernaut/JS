/*const age = 16;
if(age >=18){
    console.log("you can buy it");
}else{
    console.log("you can't buy it");
}

const score = 812;
if(score >=900){
    console.log("Perfect!");
}else if(score >=560 && score <900){
    cosnole.log("Good!");
}else{
    cosnole.log("Do better!");
}

const temperature = Number(prompt("Enter current temperature"));

if(temperature >=50){
    alert("it's boiling hot outside");
}else if(temperature<50 && temperature>=35){
    alert("It's quite hot outside");
}else if(temperature<35 && temperature >=20){
    alert("Perfect temperature outside");
}else if(temperature<20 && temperature >=10){
    alert("it's chilly outsude");
}else if(temperature<10 && temperature>= -5){
    alert("it's cold outside");
}else if(temperature<-5){
    alert("It's freezing cold!");
}

const is_admin = false;
const is_moderator = true;

if(is_admin == true || is_moderator == true){
    console.log("Access premitted");
}

const is_blocked = false;
if(!is_blocked){
    console.log("Welcome back!");
}

const has_ticket = true;
const age = 12;
if(age >18 && has_ticket == true){
    console.log("Access granted!");
}

const name = "John";
if(name){
    console.log("Name exsists");
}

const status = age >= 10 ? "Access premited":"Access granted";


const role = "admin";

switch(role){
    case "admin":console.log("admin, hello!");break;
    case "moderator":console.log("moder, hello!");break;
    case "user":console.log("user, hello!");break;
    default:console.log("undefined");break;
}

//role === "admin";// switch -> better

let number = 1;
while(number <=5){
    console.log(number);
    number++;
}

do{
    console.log(number);
    number++;
}while(number<=10);



for(let i = 0;i<10;i++){
    if(i %2 ==0){
        console.log(i);
    }
}

for(let i = 10;i>=0;i--){
    if(i == 7){
        continue;
    }
    if(i === 5){
        break;
    }
    
    console.log(i);
    
}

const price = 100;

const discount = 20;
console.log(price - (price*discount/100));


function greeting(name){
    console.log("Hello!" + name);
}
greeting("Max");
greeting("James");

function calculate_total(price,quantity){
    return price*quantity;
}
function test(){
    console.log("Before EOF");
    return;
    console.log("After EOF");
}
test();


function check_age(age){
    if(age>=18){
        return "Adult";
    }else{
        return "Child";
    }
}

const app_name = "My awesome app";
function show_app_name(){
    console.log(app_name);
}


const greet = function(){
    console.log("hello!");
}
const ask = (name)=>{alert("Who are you?")};
const double_val = (number)=> number*2;
const add = (x,y)=> x+y ;


function sum(...numbers){
    console.log(numbers);
    let total = 0;
    for(i of numbers){
        total+=i;
    }
    return total;
}
sum(1,2,3,4,5,6,7);

const nums = [1,2,3];
console.log(...nums);

const numbers_2 = [10,20,30];
Math.max(...numbers_2);


function countdown(number){
    console.log(number);
    countdown(number-1);
}//infine
function countdown_to_zero(number){
    if(number<=0){
        console.log("end");
        return;
    }
    console.log(number);
    countdown_to_zero(number-1);
}
function factorial(number){
    if(number === 0 || number === 1){
        return 1;
    }
    return number*factorial(number-1);
}
factorial(5);


function outer_func(){
    const message = "Hello world!";
    function inner_func(){
        console.log(message);
    }
    inner_func();
}

function create_counter(){
    let count = 0;
    return function(){
        count++;
        return count;
    }   
}
const counter = create_counter();

function create_greet(greet){
    return function(name){
        console.log(`${greet} ${name}!`);
    }
}
const hello = create_greet("Hello");
const hi = create_counter("Hi!");
hello("alice");
hi("bob");

*/

//task1
const age = Number(prompt("Your age"));
if(age< 18){
    alert("Access denied!");
}

//task2
for(let i = 1;i<20;i++){
    console.log(i +" ");
    if(i%2 == 0){
        console.log("even")
    }else{
        console.log("odd");
    }
}

//task3
function calculate_discount(price, discount_rate){
    return (price - (price*discount_rate)/100);
}
calculate_discount(1000,20);


//task4
function check_access(age, is_blocked){
    if(age<18 || is_blocked === true){
        return false;
    }
    return true;
}
check_access(12,1);

//task5
function main(){
    const name = prompt("your name");
    const age = prompt("your age");
    const balance = prompt("your balance");
    const price = 500;

    function is_mature(age){
        return age >=18;
    }
    function is_enough_money(balance, price){
        return balance>=price;
    }
    if(is_mature(age) == true && is_enough_money(balance,price) == true){
        alert("You can buy this!");
    }else{
        alert("You can't buy this =(");
    }
}
main();

