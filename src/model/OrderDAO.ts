import {ObjectId} from "mongodb";
import Product from "./Product";
import Order from "./Order";

export class OrderDAOFactory{

    static DAOToEntity(order: OrderDAO): Order{
        return new Order(order.products);
    }
}

export interface OrderDAO{
    _id: ObjectId,
    products: Product[],
    totalPrice: number
}