import { Request, Response } from "express";
import IProductService from "../services/interfaces/IProductService";

export default class ProductController{

    private productService: IProductService;

    constructor(productService: IProductService){
        this.productService = productService;
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            return res.status(200).send(await this.productService.getProducts());
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }    

}