import { Request, Response } from "express";

export default class OrderController{

    private dbService: IDataBase;

    constructor(dbService: IDataBase){
        this.dbService = dbService;
    }

    getOrders = async (req: Request, res: Response) => {
        try {
            return res.status(200).send(await this.dbService.getOrders());
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }

    saveOrder = async (req: Request, res: Response) => {
        try {
            const order: Order = req.body;
            await this.dbService.saveOrder(order);
            return res.status(200).send({message: "Orden registrada"});
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }
}