import { Router } from "express";
import OrderController from "../controllers/OrderController";
import OrderService from "../services/impls/OrderService";
import MongoConnection from "../services/impls/mongoService";


const orderRouter =  Router()

const repository =  new MongoConnection()
const orderService =  new OrderService(repository);
const orderController = new OrderController(orderService);

orderRouter.get("/", orderController.getOrders.bind(orderController));
orderRouter.post("/", orderController.saveOrder.bind(orderController));

export default orderRouter;