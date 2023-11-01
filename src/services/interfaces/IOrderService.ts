export default interface IOrderService{
    getOrders():Promise<Order[]>
    saveOrder(order:Order):Promise<void>
}