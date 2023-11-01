import { Request, Response } from "express";
import OrderDTO from "../model/OrderDTO";
import IOrderService from "../services/interfaces/IOrderService";

export default class OrderController{

    private orderService: IOrderService;

    constructor(orderService: IOrderService){
        this.orderService = orderService;
    }

    getOrders = async (req: Request, res: Response) => {
        try {
            return res.status(200).send(await this.orderService.getOrders());
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }

    saveOrder = async (req: Request, res: Response) => {
        try {
            const orderDTO: OrderDTO = req.body;
            const order: Order = orderDTO.DTOToEntity();
            await this.orderService.saveOrder(order);
            return res.status(200).send({message: "Orden registrada"});
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }
}