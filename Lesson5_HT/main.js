//task1
class marker{
    #color = "#000000";
    _fuel = 100.00;
    #text_field = null;
    constructor(color,text_field_id){
        this.#color = color;
        this.#text_field = document.querySelector(text_field_id);
    }
    print(text){
        if(text.trim().length*0.5 <= this._fuel && this._fuel >0.00){
            this.#text_field.textContent += text;
            this.#text_field.style.color = this.#color;
            this._fuel -= 0.5*text.trim().length;
        }
    }
    get fuel(){
        return this._fuel;
    }
}

class refilable_marker extends marker{
    constructor(color,text_field_id){
        super(color,text_field_id);
    }
    refill(value){
        this._fuel = value;
    }
}

const _marker = new marker("#00FF00","#text_field");
_marker.print("Hello!");

const _refilable_marker = new refilable_marker("#AB00FF","#text_field_2");
_refilable_marker.print("HI!");
_refilable_marker.refill(100) ;
console.log(_marker.fuel);
console.log(_refilable_marker.fuel);


//task2
class extended_date extends Date{
    print(){
        const day = this.getDate();
        const month = this.getMonth();
        console.log(`${day}`);
    }

    is_future() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const compareDate = new Date(this);
        compareDate.setHours(0, 0, 0, 0);

        return compareDate >= today;
    }

    is_leap() {
        const year = this.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    get_next_date() {
        const next = new Date(this);
        next.setDate(next.getDate() + 1);
        return new extended_date(next.getFullYear(), next.getMonth(), next.getDate());
    }
}
const myDate = new extended_date(2024, 1, 28); 
console.log(`base_date: ${myDate.toISOString().split('T')[0]}`);
console.log("-".repeat(30));

console.log(`text_date: ${myDate.print()}`);

console.log(`Is future?: ${myDate.is_future()}`);

console.log(`Is ${myDate.getFullYear()} leap?: ${myDate.is_leap()}`);

const nextDt = myDate.get_next_date();
console.log(`Next: ${nextDt.toISOString().split('T')[0]} (${nextDt.print()})`);


//task3

class employee{
    name = "";
    surname = "";

    constructor(name,surname){
        this.name = name;
        this.surname = surname;
    }

}

class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {
        const rows = this.employees
            .map(emp => `<tr><td>${emp.name}</td><td>${emp.surname}</td></tr>`)
            .join('');

        return `
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }
}

const array = [
    new employee('Maxim','Marksman'),
    new employee('Mary','Sew'),
    new employee('Marty','Stew')
];

const empTable = new EmpTable(array);

//task4

class StyledEmpTable extends EmpTable {
    getStyles() {
        return `
            <style>
                .styled-table {
                    border-collapse: collapse;
                    margin: 25px 0;
                    font-size: 0.9em;
                    font-family: sans-serif;
                    min-width: 300px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .styled-table thead tr {
                    background-color: #009879;
                    color: #ffffff;
                    text-align: left;
                }
                .styled-table th,
                .styled-table td {
                    padding: 12px 15px;
                }
                .styled-table tbody tr {
                    border-bottom: 1px solid #dddddd;
                }
                .styled-table tbody tr:nth-of-type(even) {
                    background-color: #f3f3f3;
                }
                .styled-table tbody tr:last-of-type {
                    border-bottom: 2px solid #009879;
                }
            </style>
        `;
    }
    getHtml() {
        let baseHtml = super.getHtml();
        baseHtml = baseHtml.replace('<table>', '<table class="styled-table">');

        return this.getStyles() + baseHtml;
    }
}

const styledEmpTable = new StyledEmpTable(array);