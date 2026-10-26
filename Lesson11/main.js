async function get_number(){
    return 10;
};

get_number().then((number)=>{
    console.log(number);
});


async function get_user() {
    return{
        id:1,
        name:"Anna"
    };
}
get_user().then((user)=>{
    console.log(user.name);
});

async function error() {
    throw new Error("Error");
}
error().catch((error)=>{
    console.log(error.message);
})


async function print_total() {
    const user = await get_user();
    const order = await get_orders();
    const total = order.reduce((sum,order)=>sum + order.total,0); 

    console.log(total);
    return total;
} 

async function main() {
    const total = await print_total();
    console.log(total);
}
main();



async function handle_login() {
    button.disabled = true;
    try{
        const user = await fake_login(input.value.trim());
        message.textContent = "Greet!" + user.name;

    }catch(error){
        message.textContent = "Error ={";
    }finally{
        button.disabled = false;
    }
}


function handle_registration() {
    button.disabled = true;
    message.textContent = "Sending data...";

    fake_register(input.value.trim()).then((response) => {
        message.textContent = "Registration successful";
    }).catch((error) => {
        message.textContent = "Registration failed";
    }).finally(() => {
        button.disabled = false;
    });
}





function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function handle_registration(event) {
    if (event) event.preventDefault();

    const originalButtonText = button.textContent;

    button.disabled = true;
    button.textContent = "Loading...";
    message.textContent = "Sending data...";

    fake_register(input.value.trim())
        .then((user) => {
            message.textContent = "Registration successful";
            
            document.cookie = `username=${encodeURIComponent(user.name)}; max-age=86400; path=/`;
            
            if (typeof form !== 'undefined' && form) {
                form.reset();
            } else {
                input.value = "";
            }
        })
        .catch((error) => {
            message.textContent = "Registration failed";
        })
        .finally(() => {
            button.disabled = false;
            button.textContent = originalButtonText;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const savedName = getCookie("username");
    
    if (savedName) {
        message.textContent = `Welcome back, ${savedName}!`;
    }
});






/*
 /----\
 \    /
  \  /
   \/
   */