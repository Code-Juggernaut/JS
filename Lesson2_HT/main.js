/*

5. Напишіть функцію, яка перевіряє, чи є передане їй число досконалим.
Досконале число — це число, що дорівнює сумі всіх своїх власних дільників.
6. Напишіть функцію, яка приймає мінімальне та максимальне значення для
діапазону та виводить ті числа з діапазону, які є досконалими. Використовуйте
написану раніше функцію, щоб перевірити число на досконалість.
*/



//task1
let from = Number(prompt("from"));
let to = Number(prompt("to"));
let sum = 0;
for(let i = from;i<=to;i++){
    sum +=i;
}
alert(`sum = ${sum}`);

//task2


function gcd(u,v){
    let shift;
    if (u === 0) return v;
    if (v === 0) return u;
    for (shift = 0; ((u | v) & 1) == 0; ++shift) {
        u >>= 1;
        v >>= 1;
    }
    while ((u & 1) == 0){
        u >>= 1;
    }
    do {
        while ((v & 1) == 0){  
            v >>= 1;
        }
        if (u > v) {
            let t = v; v = u; u = t; 
        }

        v = v - u; 
        } while (v != 0);

    return u << shift;
}
let num_a = Number(prompt("Enter first number"));
let num_b = Number(prompt("Enter second_number"));
alert(`GCD = ${ gcd(num_a, num_b)}`);

//task3
num_a = Number(prompt("Enter number"));
const answers = [];

for(let i = 1;i<=num_a;i++){
    if(num_a%i === 0){
        answers.push(i);
    }
}
alert("number / {" + answers.toString() +"}");

//task4
let number = prompt("enter number");
alert(`number_length = ${number.length}`);

//task5
let even = 0;
let odd = 0;
let amount_of_zero = 0;
let amount_of_higher_than_zero = 0;
let amount_of_lower_than_zero = 0;

for(let i = 0;i<10;i++){
    let number = Number(prompt("enter number"));
    if(number <0){
        amount_of_lower_than_zero++;
    }else if(number == 0){
        amount_of_zero ++;
    }else{
        amount_of_higher_than_zero++;
    }
    if(number != 0){
        if(number%2 ==0){
            even++;
        }else{
            odd++;
        }
    }
}
alert(`>0 ${amount_of_higher_than_zero} =0 ${amount_of_zero} <0 ${amount_of_lower_than_zero} %2 ==0 ${even} %2 !=0 ${odd}`);

//task6
let is_running = true;
while(is_running != false){
    num_a = Number(prompt("enter first number"));
    num_b = Number(prompt("Enter second number"));
    let result = 0;
    let operation = prompt("enter operation");
    switch(operation){
        case '+':result = num_a + num_b;break;
        case '-':result = num_a - num_b;break;
        case '*':result = num_a * num_b;break;
        case '/':result = num_a / num_b;break;
    }
    alert(`${num_a} ${operation} ${num_b} = ${result}`);
    is_running = Boolean(confirm("continue?"));
}

//task7
number = prompt("Enter number");
let amount_of_shift = Number(prompt("shift amount"));
let result = new Array();

for(let i = 0;i<number.length;i++){
    let newIndex = (i - amount_of_shift + number.length) % number.length;
    result[newIndex] = number[i];
}
alert(result);

//task8
const days_of_week = ["monday","tuesday","wednessday","thursday","friday","saturday","sunday"];
is_running = true;
let position = 0;
while(is_running != false){
    alert(days_of_week[position]);
    position++;
    is_running = confirm("continue?");
}

//task9
for(let j = 1;j<=10;j++){
    for(let i = 2;i<=10;i++){
        console.log(`${i} * ${j} = ${i*j}`);
    }
    console.log(" ");
}
//task10 
alert("Number guesser");

let array = [];
position = 0;
for(let i = 0;i<100;i++){
    array.push(Number(i));
}
let max_bound = array.length-1;
let min_bound = 0;
position = array.length>>1;

while(true){
    position = (min_bound + max_bound) >> 1;
    if(confirm(`Number = ${array[position]}`) == true){
        break;
    }else{
        if(confirm(`Number > ${array[position]}`) == true){
            min_bound = position+1;
        }else{
            max_bound = position-1;
        }
        
    }
}

//task11
function pow(number, value){
    if(value == 0){
        return number;
    }
    return pow(number,value-1);
}
console.log(pow(4,2));


//task12
function gcd_recursive(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
console.log(gcd_recursive(12,24));

//task13
function max_digit(number) {
    if (number < 10){
        return number;
    } 
    const last_digit = number % 10;
    const max_of_rest = max_digit(Math.floor(number / 10));
    return Math.max(last_digit, max_of_rest);
}


console.log(max_digit(48923));

//task14
function is_prime(number, divisor = 2) {
    if (number <= 1){
        return false;
    }
    if (divisor * divisor > number) {
        return true; 
    }
    if (number % divisor === 0){
        return false;   
    }

    return is_prime(number, divisor + 1);         
}


console.log(is_prime(17)); 

//task15
function get_prime_factors(number, divisor = 2, result = []) {
    if (number < 2){
        return result;
    }
    
    if (number % divisor === 0) {
        result.push(divisor);
        return get_prime_factors(number / divisor, divisor, result); 
    }
    
    return get_prime_factors(number, divisor + 1, result);
}

console.log(get_prime_factors(84)); 

//task16
function fibonacci_nums(position,start = 1, prev = 1){
    if(position == 0){
        return start;
    }
    return fibonacci_nums(position-1,start+prev,start);
}


//task17
function compareNumbers(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

console.log(compareNumbers(5, 10));  

//task18
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5));

//task19
function combine_digits(a, b, c) {
    return a * 100 + b * 10 + c;
}

console.log(combine_digits(1, 4, 9)); 

//task20
function square(length, width = -1){
    if(width == -1){
        return length **2;
    }
    return width*length;
}

//task21
function is_perfect_number(n) {
    if (n <= 1){
        return false;
    }    
    let sum = 0;
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) {
            sum += i;
        }
    }
    
    return sum === n;
}

console.log(is_perfect_number(6));  

//task22
function find_perfect_numbers_in_range(min, max) {
    let perfectNumbers = [];
    
    for (let i = min; i <= max; i++) {

        if (is_perfect_number(i)) {
            perfectNumbers.push(i);
        }
    }
    
    return perfectNumbers;
}


console.log(find_perfect_numbers_in_range(1, 500)); 
