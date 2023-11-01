export default interface IProductService{
    getProducts(): Promise<Product[]>
}