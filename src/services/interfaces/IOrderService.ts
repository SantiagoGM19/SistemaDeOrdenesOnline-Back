import Order from "../../model/Order"

export default interface IOrderService{
    getOrders():Promise<Order[]>
    saveOrder(order:Order):Promise<void>
}