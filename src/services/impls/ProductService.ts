import IProductService from "../interfaces/IProductService";

export default class ProductService implements IProductService{

    private dbService: IDataBase;

    constructor(dbService: IDataBase) {
        this.dbService = dbService;
    }

    getProducts = async (): Promise<Product[]> => {
        return await this.dbService.getProducts();
    }
}