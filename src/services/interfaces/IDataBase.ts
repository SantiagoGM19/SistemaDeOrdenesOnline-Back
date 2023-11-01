interface IDataBase{
    getProducts(): Promise<Product[]>
    saveUser(user:User): Promise<void>
    getUser(email: string): Promise<User|null>
    getOrders(): Promise<Order[]>
    saveOrder(order:Order): Promise<void>
}