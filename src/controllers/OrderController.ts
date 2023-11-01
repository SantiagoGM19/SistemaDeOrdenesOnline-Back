import { Request, Response } from "express";
import OrderDTO from "../model/OrderDTO";

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
            const orderDTO: OrderDTO = req.body;
            const order: Order = orderDTO.DTOToEntity();
            await this.dbService.saveOrder(order);
            return res.status(200).send({message: "Orden registrada"});
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }
}