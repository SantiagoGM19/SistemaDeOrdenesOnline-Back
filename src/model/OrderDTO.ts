import Order from "./Order";
import Product from "./Product";

export class OrderDTOFactory{
    static DTOToEntity(orderDTO: OrderDTO){
        return new Order(orderDTO.getProducts());
    }
}

export class OrderDTO{
    private products:Product[]
    constructor(products: Product[]){
        this.products = products;
    }

    getProducts = () => {
        return this.products;
    }
}