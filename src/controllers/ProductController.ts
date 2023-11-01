import { Request, Response } from "express";

export default class ProductController{

    private dbService: IDataBase;

    constructor(dbService: IDataBase){
        this.dbService = dbService;
    }

    getProducts = async (req: Request, res: Response) => {
        try {
            return res.status(200).send(await this.dbService.getProducts());
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }    

}