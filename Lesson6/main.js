//console.log


const body = document.body;
console.log(body);
document.body.style.backgroundColor = "red";
const theme_switch = document.querySelector("#theme_switch");
theme_switch.addEventListener("click", ()=>{
    document.body.classList.toggle("dark-theme")
});
console.log(document.head);
const element_title = document.head.querySelector("title");
console.log(element_title.textContent);

const css = document.createElement("link");

css.rel = "stylesheet";
css.href = "./styles.css";
document.head.append(css);
document.documentElement;
document.log(document.documentElement.tagName);

document.title.toLocaleUpperCase();
document.body.classList.add("dark-theme");

const title = document.querySelector(".title");
title.textContent = "Hi!";
title.classList.add("active");

const button = document.querySelector("button");
console.log(button.textContent);

const class_button = document.querySelector(".button");

const product = document.querySelector("[data_id = '10']");
console.log(product.textContent);

const buy_button = document.querySelector(".card.buy");

const items = document.querySelectorAll("li");
items.forEach((item)=>{
    console.log(item.textContent);
})