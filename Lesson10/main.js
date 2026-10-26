console.log("begin");
setTimeout(()=>{
    console.log("Timer stopped");
})
console.log("End");

console.log("A");
setTimeout(()=>{
    console.log("B");
});
console.log("C");


function greet(name){
    console.log("HI!", name);
}
function process_user(callback){
    const name = "Olena";
    callback(name);
}

process_user(greet);

const numbers = [1,2,3];
numbers.forEach((number) =>{
    console.log(number);
});
console.log("Done!");
setTimeout(()=>{
    console.log("Suspended callback");
},1000);

function load_user(should_fail,callback){
    setTimeout(() =>{
        if(should_fail){
            callback(new Error("404 not found"));
            return;
        }
        callback(null,{id:1,name:"Maxim"});
    },1000);
}

load_user(false,(error,user)=>{
    if(error){
        console.log(error.message);
        return;
    }
    console.log(user.name);
});

load_user((user)=>{
    console.log("User loaded",user);
})


const promise = new Promise((resolve,reject) =>{
    setTimeout(()=>{
        resolve("Data received",1000);
    })
});

console.log("A");
const _promise = new Promise((resolve)=>{
    console.log("B");
    resolve("Done");
})
console.log("C");
_promise.then((result)=>{
    console.log(result);
});



function delay(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    });
}

console.log("starting wait");
delay(1500).then(()=>{
    console.log("waiting complete");
});
console.log("...working");

function get_message_after_delay(message, delay){
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
        resolve(message);
    });
}
get_message_after_delay("hello world!").then((message)=>{
    console.log(message);
})


Promise.resolve(100).then((number)=>{
    return number;
}).then((numebr)=>{
    return numebr+5;
}).then((result)=>{
    console.log(result);
});

Promise.reject(new Error("Error"));

function double_after_delay(number){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(number*2);
        },1000);

    });
}

Promise.resolve(10).then((number)=>{
    return double_after_delay(number);
}).then((result)=>{
    console.log(result);
})

function get_user(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                id:7,
                name:"Maxim"
            });
        },500);
    });
}

function get_orders(user_id){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({id:1,user_id,total:500},
                {id:2,user_id,total:700}
            );
        },500);
    });
}

get_user().then((user)=>{
    console.log("USer",user);
    return get_orders(user.id);
}).then((orders)=>{
    return orders.reduce((sum,order)=> sum+ order.total,0);
}).then((total)=>{
    console.log("sum:",total);
}).catch((error)=>{
    console.log("error",error.message);
});


Promise.resolve({name:""}).then((user)=>{
    if(user.name ===""){
        throw new Error("name is empty");
    }
    return user.name;
}).catch((error)=>{
    console.log("Error",error.message);
});

const promise_2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        throw new Error("error");
    },500);
})


const promise_3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject( new Error("error"));
    },500);
})

const promise_4 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        try{
            const data = JSON.parse("invalid json");
            resolve(data);
        }catch(error){
            reject(error);
        }
    },500);
})
load_user().then((user)=>{
    console.log(user);
}).catch((error)=>{
    console.log(error.message);
}).finally(()=>{
    console.log("Done!");
})




function sim_task(name,ms,should_fail = false){
    console.log("start",name);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(should_fail){
                console.log("error");
                reject(new Error("error"));
                return;
            }
            console.log("Success");
            resolve(name,"result");

        });
    });
}
const first = sim_task("OP1",1000,true);
const second = sim_task("OP2",1000);


Promise.all([
    sim_task("Profile",122),
    sim_task("cart",123),
    sim_task("Messages",12233)
]).then((results)=>{
    console.log(results);
}).catch((error)=>{
    console.log(error.message);
});





function sendDataToServer(data) {
    return new Promise((resolve, reject) => {
        console.log("Sending...");
        
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; 

            if (isSuccess) {
                resolve({ status: 200, message: "Saved successfully!" });
            } else {
                reject(new Error("try again later."));
            }
        }, 2000);
    });
}

const get_form = document.querySelector("#form");
get_form.addEventListener('submit', (event) => { 
    event.preventDefault();
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const age = document.querySelector("#age");
    const selected_event = document.querySelector("#list");
    const is_accepted_policy = document.querySelector("#pivacy_policy");
    const message = document.querySelector("#messages");

    try{
        if(name.value.length < 2){
            throw new Error("name must be at least 2 symbols long");
        }
        if(!email.value.includes("@")){
            throw new Error("email must contain @");
        }
        if(Number(age.value) < 16 || Number(age.value) >= 100){
            throw new Error("Age must be between 16 and 100");
        }
        if(selected_event.value === ""){
            throw new Error("Event must be selected");
        }
        if(is_accepted_policy.checked === false){
            throw new Error("Policy must be accepted")
        }
    }catch(error){
        message.style.color = "red";
        message.textContent = error.message;
        return;
    }

    message.style.color = "black";
    message.textContent = "Обробка...";

    const data = {
        name: name.value,
        email: email.value,
        age: Number(age.value),
        selected_event: selected_event.value,
        is_accepted_policy: is_accepted_policy.checked
    }

    const jsonString = JSON.stringify(data);
    console.log("JSON:", jsonString);

    const parsedData = JSON.parse(jsonString);
    console.log("Restored object:", parsedData);
    console.log("Is identical?", JSON.stringify(data) === JSON.stringify(parsedData));


    sendDataToServer(jsonString)
        .then(response => {
            message.style.color = "green";
            message.textContent = response.message;
        })
        .catch(serverError => {
            message.style.color = "red";
            message.textContent = serverError.message;
        });
});