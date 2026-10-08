class Ticket{
    #title;
    #owner;
    #price;
    #used = 0;
    constructor(title,owner,price){
        this.#owner = owner;
        this.#price = price;
        this.#title = title;
    }
    get check_state(){
        return used === 0;
    }
    features(){
        console.log("No features");
    }
    use_ticket(){
        if(used !== 0){
            throw new Error("ticket expired");
        }
        used = 1;
    }
    get type(){
        return "generic ticket";
    }
}
class vip_ticket extends Ticket{
    #access_to_VIP_zone = 1;

    constructor(title,owner,price){
        super(title,owner,price);
    }
    features(){
        console.log("-> Free food zone \n -> Seats in first row \n -> recording of concert\n");
    }
    get access_to_VIP(){
        if(this.#used == 1){
            access_to_VIP_zone = 0;
            return access_to_VIP_zone;
        }
        return access_to_VIP_zone === 1;
    }

    get type(){
        return "VIP ticket";
    }
}

class online_ticket extends Ticket{
    #link = "";
    constructor(title,owner,price,link){
        super(title,owner,price);
        this.#link = link;
    }
    run_translation(){
        if(link != "" && this.check_state() == 1){
            this.use_ticket();
            console.log("translation started");
            return;
        }
    }
    features(){
        console.log("Online");
    }
    get type(){
        return "Online ticket";
    }
}
const array = [
    new Ticket("Harry Potter","John Smith", 999),
    new vip_ticket("The Avengers","Maria Anex",5321),
    new online_ticket("Crushed the Void","Max Manets",2341,"https://google.com")
];
for(const i in array){
    console.log(i.type);
}

class event_entrance extends Ticket{
    static valid_ticket(ticket){
        return ticket.check_state();
    }
    static enter_to_the_event(ticket){
        try{
            if(this.valid_ticket(ticket)){
                console.log("access Granted!");
                ticket.use_ticket();
            }else{
                console.log("access denied!");
            }
        }catch(error){
            console.log("error occured",error.message);
        }
    }
}
event_entrance.valid_ticket(array[0]);
event_entrance.enter_to_the_event(array[1]);
event_entrance.enter_to_the_event(array[1]);


function get_features(ticket){
    return ticket.features();
}
get_features(array[2]);