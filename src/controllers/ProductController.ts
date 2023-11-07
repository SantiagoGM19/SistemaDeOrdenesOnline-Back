import { Request, Response } from "express";
import IProductService from "../services/interfaces/IProductService";

export default class ProductController{

    private productService: IProductService;

    constructor(productService: IProductService){
        this.productService = productService;
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            const data = await this.productService.getProducts();
            return res.status(200).send({data: data, status:200});
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }    

}