const user =   {
    name:"Maxim",
    skils:["HTML","CSS"]
}
const json_text = JSON.stringify(user);
console.log(typeof user);//object
console.log(typeof json_text);

const skils = ["HTML","CSS","JS"];
const json_text2 = JSON.stringify(skils);
console.log(json_text2);
const json_text3 = JSON.stringify(user,null,2);
console.log(json_text3);
const json_text4 = '{"name":"Mary","age":34,"is_student":true}'
const user2 = JSON.parse(json_text4);
console.log(user2.name);

const original = {
    name:"Maxim",
    skils:["HTML","CSS","JS"]
}

const json_text5 = JSON.stringify(original);
const restore = JSON.parse(json_text5);
console.log(original === restored);


const json_text6 = '["HTML","CSS","JS"]';
const skils2 = JSON.parse(json_text6);
console.log(Array.isArray(skils2));
console.log(skils2[0]);

const json_text7 = '{"name":"Maxim"}';
const user3 = JSON.parse(json_text7);

try{
    const user3 = JSON.parse(json_text7);
    console.log(user3);
}catch(e){
    console.log(e.message);
}



const first = '{"name":"Roman","age":30}';
const second = '{"name":"Roman",}';
const third = '[1,2,3]';
try{
    const json1 = JSON.parse(first);
    const json2 = JSON.parse(second);//synax error
    const json3 = JSON.parse(third);

}catch(e){
    console.log(e.message);
}finally{
    console.log(typeof json1);
    console.log(typeof json2);
    console.log(typeof json3);
}


const user4 = {
    id:1,
    name:"Maxim",
    note:"this is user",
    toJSON(){
        return{
            id: this.id,
            name: this.name
        };
    }
}

console.log(JSON.stringify(user4));//{"id","name"}

class Student {
    #name;
    #scores;
    constructor(name, scores) {
        this.#name = name;
        this.#scores = [...scores];
    }
    getAverageScore() {
        if (this.#scores.length === 0) {
            return 0;
        }
        const sum = this.#scores.reduce((total, score) => total + score,0);
        return sum / this.#scores.length;
    }
 
    toJSON() {
        return {
        name: this.#name,
        scores: [...this.#scores],
        averageScore: this.getAverageScore()
        };
    }
}

const student = new Student("Mark",[12,11,10]);
console.log(JSON.stringify(student,null,2));

fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(responce=>responce.json())
    .then(user=>{console.log(user);})
    .catch(error=>{console.log("error",error);});
