import { Request, Response } from "express";
import IOrderService from "../services/interfaces/IOrderService";
import Order from "../model/Order";
import { OrderDTO, OrderDTOFactory } from "../model/OrderDTO";

export default class OrderController{

    private orderService: IOrderService;

    constructor(orderService: IOrderService){
        this.orderService = orderService;      
    }

    getOrders = async (req: Request, res: Response) => {
        try {
            const data = await this.orderService.getOrders();
            return res.status(200).send({data: data, status: 200});
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }

    saveOrder = async (req: Request, res: Response) => {
        try {
            const orderDTO: OrderDTO = req.body;
            const order: Order = OrderDTOFactory.DTOToEntity(orderDTO);
            await this.orderService.saveOrder(order);
            return res.status(200).send({message: "Orden registrada", status:200});
        } catch (error) {
            return res.status(500).send({message: "Ha ocurrido un error de servidor"});
        }
    }
}