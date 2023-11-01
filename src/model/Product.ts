class Product{

    private name: string;
    private price: number;
    private description: string;

    constructor(name: string, price: number, description: string){
        this.name = name;
        this.price =  price;
        this.description = description;
    }

    getName(){
        return this.name;
    }

    getPrice(){
        return this.price;
    }

    getDescription(){
        return this.description;
    }
}