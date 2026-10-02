/*let userName;
console.log(userName);

const selected_user = null;
const huge_number = 100000000000000000000000n;
const id = Symbol("id");
let count = 1;
count++;

const user = (
    name = "anna",
    age = 24,
    email = "anna@glamail.com",
    is_verified = true
);
const new_user = new Object();
new_user.name = "Anna";
new_user.age = 24;
console.log(typeof user);
console.log(user[property]);


const product = {
    id : 1,
    name : "Asus TUF A15",
    price : 1666,
    currency : "USD",
    in_stock : true
};
console.log(product.name);
product.price = 10;
product.discount = 10;
console.log(Object.entries(product));

const copy = {...product, in_stock : false};


*/

const users =[
    "amiya","mr.Nothing","Steward"
]
typeof [];
Array.isArray(users);

const new_nums = new Array(10,20,30,40);
new Array(10);
users[0] //->amiya
users.unshift("mike");
users.shift();


const roles = ["admin","manager","user"];
roles.includes("user");
roles.indexOf("manager");

const nums = [1,2,3,4,5];
const partial_nums = nums.slice(1,4);
nums.splice(2,1) // [1,3,4,5]



const products = [
  { id: 1, name: "Laptop", price: 1200, inStock: true },
  { id: 2, name: "Phone", price: 800, inStock: false },
  { id: 3, name: "Headphones", price: 200, inStock: true },
  { id: 4, name: "Monitor", price: 450, inStock: true }
];
const id_3 = products.at(3);
const in_stock = products.find(products=>products.inStock);
const names = products.map(products=>products.name);
const is_higher_than_1000 = products.some(products=>products.price>1000);
const total_cost = products.reduce((acc,curr)=> acc+curr,0);
const sort = products.toSorted((a,b)=>a-b);




const transactions = [
  {
    id: 1,
    title: "Salary",
    amount: 2500,
    type: "income",
    date: "2026-09-20T10:30:00"
  },
  {
    id: 2,
    title: "Netflix",
    amount: 15,
    type: "expense",
    date: "2026-09-21T18:10:00"
  },
  {
    id: 3,
    title: "Supermarket",
    amount: 85,
    type: "expense",
    date: "2026-09-22T12:15:00"
  },
  {
    id: 4,
    title: "Freelance",
    amount: 700,
    type: "income",
    date: "2026-09-23T09:00:00"
  }
];

transactions.filter(transactions=>transactions.type == "expense");
transactions.reduce((sum,counter)=>sum+counter.amount,0);
transactions.map(transactions=>transactions.type);
transactions.find(transactions=>transactions.title==="Netflix");
transactions.toSorted((a,b)=>a.amount-b.amount);
transactions.map(transactions=>transactions.date.split('T')[0].split('-'));
Math.random()*1000;
setTimeout(()=>{alert("This is the message")},2000);
