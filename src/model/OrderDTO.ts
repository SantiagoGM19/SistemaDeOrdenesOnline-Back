export default class OrderDTO{
    private products:Product[]
    constructor(products: Product[]){
        this.products = products
    }
    DTOToEntity(){
        return new Order(this.products);
    }
    getProductsListLength(){
        return this.products.length;
    }
}