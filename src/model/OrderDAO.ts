import {ObjectId} from "mongodb";

export default class OrderDAO{
    constructor(
        public _id: ObjectId,
        public products: Product[],
        public totalPrice: number
    ){}

    DAOToEntity(): Order{
        return new Order(this.products);
    }
}