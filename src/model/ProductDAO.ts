import {ObjectId} from "mongodb"
import Product from "./Product";

export default class ProductDAOFactory{
    static DAOtoEntity(productDAO: ProductDAO): Product{
        return new Product(productDAO.name, productDAO.price, productDAO.description);
    }
}

export interface ProductDAO{
    _id: ObjectId,
    name: string,
    price: number,
    description: string
}