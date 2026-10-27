//task1

function doubleElement(element) {
    return element * 2;
}

function reverseElement(element) {
    return String(element).split('').reverse().join('');
}

function processArray(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i]));
    }
    return result;
}

console.log(processArray([1, 2, 3, 4, 5], doubleElement)); 
console.log(processArray(["hello", "world"], reverseElement)); 

//task2
function isEven(number) {
    return number % 2 === 0;
}

function isShortWord(word) {
    return word.length <= 4;
}

function filterArray(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
}

console.log(filterArray([1, 2, 3, 4, 5], isEven)); 
console.log(filterArray(["cat", "elephant", "dog", "bird"], isShortWord)); 

//task3
function washDishes() {
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve("Dishes are done");
        }, 2000);
    });
}

function cleanRoom() {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve("Room is cleaned");
        }, 4000);
    });
}

function makeDinner() {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve("Dinner is cooked");
        }, 7000);
    });
}

washDishes().then((result1) => {
        console.log(result1);
        return cleanRoom();
    }).then((result2) => {
        console.log(result2);
        return makeDinner();
    }).then((result3) => {
        console.log(result3);
    }).catch((error) => {
        console.error("Error:", error);
    });

//task4
function sortArray(array) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(array) || array.length === 0) {
            reject("Array empty");
            return;
        }
        setTimeout(() => {
            const sorted = [...array].sort((a, b) => a - b);
            resolve(sorted);
        }, 2000);
    });
}


sortArray([5, 2, 9, 1, 7]).then((res) => console.log(res)) .catch((err) => console.log(err));
sortArray([]).then((res) => console.log(res)).catch((err) => console.log(err)); 

//task5
function multiplyAsync(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
            reject("Invalid");
            return;
        }

        setTimeout(() => {
        resolve(a * b);
        }, 2000);
    });
}

async function main() {
    try {
        const result = await multiplyAsync(6, 9);
        console.log("Результат множення:", result); 
    } catch (error) {
        console.error(error);
    }
}

main();

//task6
function sortArrayAsync(array) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(array) || array.length === 0) {
            reject(new Error("Array empty"));
            return;
        }

        setTimeout(() => {
            const sortedArray = [...array].sort((a, b) => a - b);
            resolve(sortedArray);
        }, 2000);
    });
}

async function main() {
    try {
        const numbers = [12, 3, 45, 1, 8];
        console.log("Sorting...");
        const sorted = await sortArrayAsync(numbers);
        console.log("Sorted:", sorted);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();