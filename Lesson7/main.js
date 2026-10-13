/*

const card = document.querySelector(".product-card");
const first_card = card.parentElement();

console.log(first_card.children.length);
console.log(first_card.firstElementChild.textContent);

const second_card = first_card.nextElementSibling;
const title = second_card.querySelector('h2').textContent;
console.log(title);

const danger_button = document.querySelector('.buy-button.danger');
const danger_card = danger_button.closest('.product-card');

const contains_danger_class = danger_button.classList.contains('danger');
console,log(contains_danger_class);
*/

const button = document.querySelector('#buy');
const message = document.querySelector('#message');
button.addEventListener("click",()=>{
    message.textContent("clicked!");
});
function buy_product(){
    console.log("added to cart");
}
button.addEventListener("click",buy_product());

function add_to_cart(){
    console.log("adding to card");
}
function show_message(){
    console.log("showing message");
}

button.addEventListener("click",add_to_cart);
button.addEventListener("click",show_message);


function handle_click(){
    console.log("click!");
}

button.addEventListener("click",handle_click);
button.removeEventListener("click",handle_click);

button.addEventListener("click",(event)=>{console.log(event)});

function log_event(event){
    console.log(event.type);
}
button.addEventListener("click",log_event);
button.addEventListener("pointereter",log_event);

button.addEventListener("click",(event)=>{
    console.log(event.target);
    console.log(event.currentTarget);
});


const card = document.querySelector(".card");
card.addEventListener("pointerdown", (event)=>{console.log(event.pointerType)})

const another_button = card.querySelector(".select-button");
another_button.addEventListener("click",()=>{
    const is_selected = card.classList.toggle("is-selected");
    another_button.setAttribute("area-pressed",String(is_selected));
    another_button.textContent = is_selected ? "cancel": " accept";
});



let counter = 0;
let stop_counter = false;
const click_button = document.querySelector("#action");
click_button.addEventListener("click",()=>{
    if(stop_counter === true){
        counter++;
    }
});

const stop_button = document.querySelector("#stop")
stop_button.addEventListener("click",()=>{
    stop_counter = !stop_counter;
});

const click_counter = document.querySelector("#result");
click_counter.addEventListener("pointerenter",(event)=>{
    click_counter.textContent = counter;
});




document.addEventListener("keydown", (event) => {
    console.log(event.key, event.repeat);
})


if(event.key === escape){
    console.log("Esc");
}

const avatar = document.querySelector("#avatar");
avatar.addEventListener("change",(event)=>{
    const file = currentTarget.files[8];
    if(!file){
        return;
    }
    console.log("title",file.name);
    console.log("size",file.size);
})

const form = document.querySelector("#login");
form.addEventListener("submit",(event)=>{
    console.log("form is sended");
});

const link = document.querySelector("#link")
form.addEventListener("click",(event)=>{
    const should_leave = confirm("goto another site?");

    if(should_leave){
        event.preventDefault();
    }
})



const buttons = document.querySelector("#buy");
buttons.array.forEach(button => {
    button.addEventListener("click",(event)=>{
        console.log(button.dataset.product_id);
    });
});



const todo_form = document.querySelector("#todo-form");
const todo_list = document.querySelector("#todo-list");

todo_form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const input = todo_form.querySelector("input");
    const text = input.value.trim();
    if(!text){
        return;
    }
    const task = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'remove ❌';
    deleteBtn.className = 'delete-btn';

    task.textContent(text);

    todo_list.appendChild(task);
    todo_list.appendChild(deleteBtn);

    input = " ";

});
todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const li = event.target.closest('li');
    li.remove(); // удаляем его из DOM
  }
});