import Product from "./Product";

export default class Order{
    public products: Product[];
    public totalPrice: number;
    
    constructor(products: Product[]) {
        this.products =  products;
        this.totalPrice =  products.map(product => product.price)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }

    getProducts(){
        return this.products;
    }

    getTotalPrice(){
        return this.totalPrice;
    }
}