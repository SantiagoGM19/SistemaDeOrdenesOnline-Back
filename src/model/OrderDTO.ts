import Order from "./Order";
import Product from "./Product";

export class OrderDTOFactory{
    static DTOToEntity(orderDTO: OrderDTO){
        return new Order(orderDTO.products);
    }
}

export class OrderDTO{
    public products:Product[]
    constructor(products: Product[]){
        this.products = products;
    }

    getProducts = () => {
        return this.products;
    }
}