//task1

class circle{
    #radius = 0;
    constructor(radius){
        this.#radius = radius;
    }
    get radius(){
        return this.#radius;
    }
    get diameter(){
        return this.#radius *2;
    }
    set radius(value){
        if(value >0){
            this.#radius = value;
        }
    }
    square(){
        return Math.PI * this.#radius **2;
    }
    length(){
        return Math.PI * this.#radius*2;
    }
}
object = new circle(12);
object.radius = 10;
console.log(`r = ${object.radius}`);
console.log(`d = ${object.diameter}`);
console.log(`S = ${object.square()}`);
console.log(`l = ${object.length}`);

//task2
/* ======= CHATGPT_CODE_START ======== */
class HTML_element {
    #tag_name = "";
    #self_close = false;
    #attributes = []; 
    #styles = [];     
    #child = [];
    #text = "";

    constructor(tag_name, self_close = false, text = "") {
        this.#tag_name = tag_name;
        this.#self_close = self_close;
        this.#text = text;
    }

    add_attribute(name, value) {
        this.#attributes.push({ name, value });
        return this;
    }

    add_style(property, value) {
        this.#styles.push({ property, value });
        return this;
    }

    child_pushfront(element) {
        this.#child.push(element);
    }

    child_pushback(element) {
        this.#child.unshift(element);
    }

    get_html() {
        let attrsString = "";
        if (this.#attributes.length > 0) {
            attrsString = this.#attributes
                .map(attr => ` ${attr.name}="${attr.value}"`)
                .join("");
        }

        if (this.#styles.length > 0) {
            const stylesString = this.#styles
                .map(style => `${style.property}: ${style.value};`)
                .join(" ");
            attrsString += ` style="${stylesString}"`;
        }

        if (this.#self_close) {
            return `<${this.#tag_name}${attrsString} />`;
        }

        let innerContent = this.#text;

        if (this.#child.length > 0) {
            const childrenHtml = this.#child.map(child => child.get_html()).join("");
            innerContent += childrenHtml;
        }

        return `<${this.#tag_name}${attrsString}>${innerContent}</${this.#tag_name}>`;
    }
}

//task3

class CssClass {
    #className = "";
    #styles = [];

    constructor(className) {
        this.#className = className;
    }

    setStyle(property, value) {
        const existing = this.#styles.find(s => s.property === property);
        if (existing) {
            existing.value = value;
        } else {
            this.#styles.push({ property, value });
        }
        return this;
    }

    removeStyle(property) {
        this.#styles = this.#styles.filter(s => s.property !== property);
        return this;
    }

    getCss() {
        if (this.#styles.length === 0) return "";
        const stylesStr = this.#styles
            .map(s => `    ${s.property}: ${s.value};`)
            .join("\n");
        return `.${this.#className} {\n${stylesStr}\n}`;
    }

    getName() {
        return this.#className;
    }
}

//task4
class HtmlBlock {
    #styles = [];      
    #rootElement = null; 

    constructor(rootElement) {
        this.#rootElement = rootElement;
    }


    addCssClass(cssClass) {
        this.#styles.push(cssClass);
        return this;
    }

    getCode() {
        let cssCode = "";
        if (this.#styles.length > 0) {
            cssCode = "<style>\n" + this.#styles.map(c => c.getCss()).join("\n") + "\n</style>\n";
        }
        
        let htmlCode = this.#rootElement ? this.#rootElement.get_html() : "";
        return cssCode + htmlCode;
    }
}

const wrapClass = new CssClass('wrapper');
wrapClass.setStyle('display', 'flex')
         .setStyle('justify-content', 'center')
         .setStyle('align-items', 'center')
         .setStyle('height', '100vh')
         .setStyle('background-color', '#f5f5f5');

const cardClass = new CssClass('card');
cardClass.setStyle('width', '300px')
         .setStyle('padding', '20px')
         .setStyle('background-color', '#ffffff')
         .setStyle('border-radius', '10px')
         .setStyle('box-shadow', '0 4px 8px rgba(0,0,0,0.1)')
         .setStyle('text-align', 'center');


const rootDiv = new HTML_element('div').add_attribute('class', 'wrapper');

const cardDiv = new HTML_element('div').add_attribute('class', 'card');
const heading = new HTML_element('h2', false, 'Hello! world').add_style('color', '#333');
const paragraph = new HTML_element('p', false, 'New block.').add_style('color', '#666');

cardDiv.child_pushfront(heading);
cardDiv.child_pushfront(paragraph);
rootDiv.child_pushfront(cardDiv);

const pageBlock = new HtmlBlock(rootDiv);
pageBlock.addCssClass(wrapClass);
pageBlock.addCssClass(cardClass);

document.write(pageBlock.getCode());

/* ======= CHATGPT_CODE_END ======== */