import { Db, MongoClient } from "mongodb";
import IDataBase from "../interfaces/IDataBase";
import User from "../../model/User";
import Product from "../../model/Product";
import Order from "../../model/Order";
import dotenv from 'dotenv';
import UserDAOFactory, { UserDAO } from "../../model/UserDAO";
import ProductDAOFactory, { ProductDAO } from "../../model/ProductDAO";
import { OrderDAO, OrderDAOFactory } from "../../model/OrderDAO";

export default class MongoConnection implements IDataBase{

    private client: MongoClient;
    
    constructor(){
        const uri: string|undefined =  process.env.URI_MONGODB;
        this.client =  new MongoClient(uri?uri:"mongodb+srv://admin:NMc0J3LEDEPDaers@cluster0.kv3etq9.mongodb.net/");
    }

    getConnection = async (): Promise<Db|null> => {
        try {
            await this.client.connect();
            return this.client.db(process.env.BD_SO?process.env.BD_SO:"ordenes");
        }catch(error){
            return null
            console.log(error);
        }
    }

    getProducts = async(): Promise<Product[]> => {
        try {
            const connection = await this.getConnection()
            const productsCollection =  connection?.collection(process.env.PRODUCTS_COLLECTION?process.env.PRODUCTS_COLLECTION:'productos');
            const productsfromMongo = (await productsCollection?.find().toArray()) as ProductDAO[];
            const productsDomain: Product[] = productsfromMongo.map(product => ProductDAOFactory.DAOtoEntity(product));
            await this.client.close();
            return productsDomain;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    saveUser = async (user:User): Promise<void> => {
        try {
            const connection = await this.getConnection();
            const usersCollection =  connection?.collection(process.env.USERS_COLLECTION?process.env.USERS_COLLECTION:'usuarios');
            await usersCollection?.insertOne(user);
            await this.client.close();
        } catch (error) {
            console.log(error);
        }
    }

    getUser = async (email: string): Promise<User|null> => {
        try {
            const connection = await this.getConnection();
            const usersCollection =  connection?.collection(process.env.USERS_COLLECTION?process.env.USERS_COLLECTION:'usuarios');
            const usersFromMongo: UserDAO = (await usersCollection?.findOne({email:email})) as UserDAO;
            if(usersFromMongo){
                return UserDAOFactory.DAOToEntity(usersFromMongo);
            }
            await this.client.close();
            return null;
        } catch (error) {
            console.log();
            return null;
        }
    }

    getOrders =async (): Promise<Order[]> => {
        try {
            const connection = await this.getConnection();
            const ordersCollection =  connection?.collection(process.env.ORDERS_COLLECTION?process.env.ORDERS_COLLECTION:'orders');
            const ordersFromMongo: OrderDAO[] = (await ordersCollection?.find().toArray()) as OrderDAO[];
            const orders: Order[] = ordersFromMongo.map(order => OrderDAOFactory.DAOToEntity(order));
            await this.client.close();
            return orders;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    saveOrder = async (order:Order): Promise<void> => {
        try {
            const connection = await this.getConnection();
            const usersCollection =  connection?.collection(process.env.ORDERS_COLLECTION?process.env.ORDERS_COLLECTION:'orders');
            await usersCollection?.insertOne(order);
            await this.client.close();
        } catch (error) {
            console.log(error);
            
        }
    }
}