import Product from "../../model/Product";

export default interface IProductService{
    getProducts(): Promise<Product[]>
}