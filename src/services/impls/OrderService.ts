import IOrderService from "../interfaces/IOrderService";

export default class OrderService implements IOrderService{

    private dbService: IDataBase;

    constructor(dbService: IDataBase) {
        this.dbService = dbService;
    }

    saveOrder = async(order: Order): Promise<void> => {
        await this.dbService.saveOrder(order);
    }

    getOrders = async (): Promise<Order[]> => {
        return await this.dbService.getOrders();
    }

}