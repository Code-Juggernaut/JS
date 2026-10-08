//task1
class Car {
    #manufacturer = "";
    #model = "";
    #manufacturing_year = 0;
    #avr_speed = 0;

    constructor(manufacturer, model, manufacturing_year, avr_speed) {
        this.#manufacturer = manufacturer;
        this.#model = model;
        this.#manufacturing_year = manufacturing_year;
        this.#avr_speed = avr_speed;
    }

    print() {
        console.log(`model: ${this.#model}\n year: ${this.#manufacturing_year}\n manufacturer: ${this.#manufacturer}`);
    }

    get_time(length) {
        let break_counter = 0;
        if (length > 0) {
            break_counter = Math.floor((length / this.#avr_speed) / 4);
        }
        return (length / this.#avr_speed) + break_counter;
    }
}

const car = new Car("China_semi", "iCAR-3000", 1923, 90.0);
console.log(`Time on road: ${car.get_time(1000).toFixed(2)} h.`);
car.print();


//task2
class Fraction {
    #enumerator = 0;
    #denominator = 1;

    constructor(enumerator, denominator) {
        this.#enumerator = enumerator;
        if (denominator !== 0) {
            this.#denominator = denominator;
        } else {
            throw new Error("denominator can't be zero");
        }
    }

    get enumerator() { return this.#enumerator; }
    get denominator() { return this.#denominator; }

    static #gcd(a, b) {
        return b === 0 ? Math.abs(a) : Fraction.#gcd(b, a % b);
    }

    static simplify_fraction(fractionObj) {
        const common = Fraction.#gcd(fractionObj.enumerator, fractionObj.denominator);
        return new Fraction(fractionObj.enumerator / common, fractionObj.denominator / common);
    }
    
    static add_fractions(f1, f2) {
        const new_num = f1.enumerator * f2.denominator + f2.enumerator * f1.denominator;
        const new_den = f1.denominator * f2.denominator;
        return Fraction.simplify_fraction(new Fraction(new_num, new_den));
    }

    static sub_fractions(f1, f2) {
        const new_num = f1.enumerator * f2.denominator - f2.enumerator * f1.denominator;
        const new_den = f1.denominator * f2.denominator;
        return Fraction.simplify_fraction(new Fraction(new_num, new_den));
    }

    static mul_fractions(f1, f2) {
        const new_num = f1.enumerator * f2.enumerator;
        const new_den = f1.denominator * f2.denominator;
        return Fraction.simplify_fraction(new Fraction(new_num, new_den));
    }

    static div_fractions(f1, f2) {
        if (f2.enumerator === 0) {
            throw new Error("DIV ON ZERO");
        }
        const new_num = f1.enumerator * f2.denominator;
        const new_den = f1.denominator * f2.enumerator;
        return Fraction.simplify_fraction(new Fraction(new_num, new_den));
    }

    print() {
        console.log(`${this.#enumerator}/${this.#denominator}`);
    }
}

const f1 = new Fraction(1, 4);
const f2 = new Fraction(1, 6);
Fraction.mul_fractions(f1, f2).print();
Fraction.add_fractions(f1, f2).print();
Fraction.sub_fractions(f1, f2).print();
Fraction.div_fractions(f1, f2).print();

//task3
class Time {
    #seconds = 0;
    #minutes = 0;
    #hours = 0;

    constructor(hours, minutes, seconds) {
        this.setTime(hours, minutes, seconds);
    }

    setTime(hours, minutes, seconds) {
        let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        totalSeconds = totalSeconds % 86400;
        if (totalSeconds < 0) {
            totalSeconds += 86400;
        }

        this.#hours = Math.floor(totalSeconds / 3600);
        this.#minutes = Math.floor((totalSeconds % 3600) / 60);
        this.#seconds = totalSeconds % 60;
    }

    print() {
        console.log(`${String(this.#hours).padStart(2, '0')}:${String(this.#minutes).padStart(2, '0')}:${String(this.#seconds).padStart(2, '0')}`);
    }

    shift_seconds(seconds) {
        const currentTotal = (this.#hours * 3600) + (this.#minutes * 60) + this.#seconds + seconds;
        this.setTime(0, 0, currentTotal);
    }

    shift_minutes(minutes) {
        const currentTotal = (this.#hours * 3600) + (this.#minutes * 60) + (minutes * 60) + this.#seconds;
        this.setTime(0, 0, currentTotal);
    }

    shift_hours(hours) {
        const currentTotal = (this.#hours * 3600) + (hours * 3600) + (this.#minutes * 60) + this.#seconds;
        this.setTime(0, 0, currentTotal);
    }
}

const _time = new Time(0, 0, 0);
_time.shift_seconds(10);
_time.print();
_time.shift_minutes(102);
_time.print();
_time.shift_hours(3);
_time.print();

//task4
const products = [
    { quantity: 10, title: "Apple", is_sold: false },
    { quantity: 20, title: "Banana", is_sold: false },
    { quantity: 30, title: "Hazelnuts", is_sold: true },
];

function printList(array) {
    let temp = [...array].sort((a, b) => a.is_sold - b.is_sold);
    temp.forEach(item => {
        console.log(`${item.title} : ${item.quantity} ${item.is_sold ? "sold" : "in stock"}`);
    });
}

function add(array, item_title, quantity = 0) {
    const is_exists = array.find(item => item.title.toLowerCase() === item_title.toLowerCase());
    if (is_exists) {
        is_exists.quantity += quantity;
        if (is_exists.is_sold === true) {
            is_exists.is_sold = false;
        }
    } else {
        array.push({ quantity: quantity, title: item_title, is_sold: false });
    }
}

function buy(array, item_title, quantity) {
    const is_exists = array.find(item => item.title.toLowerCase() === item_title.toLowerCase());
    if (is_exists && is_exists.quantity >= quantity) {
        is_exists.quantity -= quantity;
        if (is_exists.quantity === 0) {
            is_exists.is_sold = true;
        }
    }
}

printList(products);

add(products, "Banana", 12);
buy(products, "Banana", 2);
printList(products);

//task5

const check = [
    { title: "Apple", quantity: 12, price: 122 },
    { title: "Banana", quantity: 3, price: 432 },
    { title: "Orange", quantity: 3, price: 12 }
];

function print_check(array) {
    array.forEach(item => {
        console.log(`${item.title} : quantity = ${item.quantity}, price = ${item.price}`);
    });
}

function total_price(array) {
    let sum = 0;
    array.forEach(item => {
        sum += item.price * item.quantity;
    });
    console.log(`total price = ${sum}`);
}

function max_price(array) {
    let max = Math.max(...array.map(item => item.price));
    console.log(`max price = ${max}`);
}

function average_price(array) {
    let sum = 0;
    let totalQuantity = 0;
    array.forEach(item => {
        sum += item.price * item.quantity;
        totalQuantity += item.quantity;
    });
    console.log(`average price = ${(sum / totalQuantity).toFixed(2)}`);
}

print_check(check);
total_price(check);
max_price(check);
average_price(check);

//task6

const styles = [
    { name: 'color', value: 'darkblue' },
    { name: 'font-size', value: '20px' },
    { name: 'text-align', value: 'center' },
    { name: 'text-decoration', value: 'underline' },
    { name: 'font-weight', value: 'bold' }
];

function printStyledText(stylesArray, text) {
    const styleString = stylesArray.map(style => `${style.name}: ${style.value}`).join('; ');

    document.write(`<p style="${styleString}">${text}</p>`);
}

printStyledText(styles, "dynamic text");