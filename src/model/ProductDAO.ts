import {ObjectId} from "mongodb"

export default class ProductDAO{
    constructor(
        public _id: ObjectId,
        public name: string,
        public price: number,
        public description: string
    ){}

    DAOtoEntity(productDAO: ProductDAO): Product{
        return new Product(productDAO.name, productDAO.price, productDAO.description);
    }
}