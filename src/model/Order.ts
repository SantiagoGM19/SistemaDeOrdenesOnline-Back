class Order{
    private products: Product[];
    private totalPrice: number;
    
    constructor(products: Product[]) {
        this.products =  products;
        this.totalPrice =  products.map(product => product.getPrice())
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }

    getProducts(){
        return this.products;
    }

    getTotalPrice(){
        return this.totalPrice;
    }
}