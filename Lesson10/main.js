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