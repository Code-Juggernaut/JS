class bank_account{
    #balance = 0;
    constructor(name,balance,currency){
        this.balance = balance;
        this.currency = currency;
        this.name = name;
    }
    deposit(amount){
        if(amount<=0){
            return;
        }
        this.#balance += amount;
    }
    get_balance(){
        return this.#balance;
    }
    withdraw(amount){
        this.#balance -= amount;
    }
    show_balance(){
        console.log(this.#balance);
    }
    static is_valid_amount(amount){
        if(amount <0){
            return 0;
        }
        return 1;
    }
    get formatted_balance(){
        return `Your balance = ${this.#balance}`;
    }

}

const account = new bank_account();
account.deposit(500);


class user{
    static create_user(){
        return new user();
    }
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    greet(){
        console.log(`Hello ${this.name}!`);
    }
}
const new_user = new user("Alice",12);
new_user.greet();
const another_user = new user("Bob",11);
const guest = user.create_user();


class product{
    constructor(name,price,category,in_stock){
        this.name = name;
        this.price = price;
        this.category = category;
        this.in_stock = in_stock;
    }
}
const new_product = new product("Apple","2$","fruits",true);


class currency{
    static convert(amount, rate){
        return amount*rate;
    }
}
const result = currency.convert(100,10);

class user_class{
    constructor(first_name, last_name){
        this.first_name = first_name;
        this.last_name = last_name;
    }
    get full_name(){
        return this.first_name + " " + this.last_name;
    }
}
const new_users = new user_class("anna","smith");
console.log(new_users.full_name);

class products{
    constructor(price,discount){
        this.price = price;
        this.discount = discount;
    }

    get final_price(){
        return this.price - this.price*this.discount/100;
    }
}
const product_ = new products(1000,7);
console.log(product_.final_price);



class User{
    #age = 0;
    constructor(age){
        this.#age = age;
    }
    set age(value){
        if(value<0){
            throw new Error("Age must be >0");
        }
        this.#age = value;
    }
    get age(){
        return this.#age;
    }
}

const  new_user = new User(20);
new_user.age = 25;


class Payment_method{
    pay(amount){
        throw new Error("pay() must be declared");
    }
}
class card_payment extends Payment_method{
    pay(amount){
        console.log("using card");
    }
}
class goofle_pay extends Payment_method{
    pay(amount){
        console.log("Using goofle pay");
    }
}
const payment_method = [
    new card_payment(),
    new goofle_pay()
]
for(const method of payment_method){
    method.pay(123);
}

try{
    let user = JSON.parse(json);
}catch(error){

}


const json = `{"name:"anna}"`





class bank_account{
    #balance = 0;
    constructor(owner, balance=0){
        this.#balance = balance;
        this.owner = owner;
    }
    get balance(){
        return this.#balance;
    }
    deposit(amount){
        if(amount<=0){
            throw new Error("amount must be above zero");
        }
        this.#balance += amount;
    }
    withdraw(amount){
        if(amount<=0){
            throw new Error("amount must be above zero");
        }
        if(amount > this.#balance){
            throw new Error("Insufficient balance");
        }
    }
    get_account_type(){
        return "standard";
    }
}