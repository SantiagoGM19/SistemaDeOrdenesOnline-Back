import { Db, MongoClient } from "mongodb";
import ProductDAO from "../model/ProductDAO";
import UserDAO from "../model/UserDAO";

export default class MongoConnection{

    private client: MongoClient;

    constructor(){
        const uri: string|undefined =  process.env.URI_MONGODB;
        this.client =  new MongoClient(uri?uri:"");
    }

    getConnection = async (): Promise<Db> => {
        try {
            await this.client.connect();
            return this.client.db(process.env.BD_SO);
        }finally{
            await this.client.close();
        }
    }

    getProducts = async(): Promise<Product[]> => {
        try {
            const connection = await this.getConnection()
            const productsCollection =  connection.collection(process.env.PRODUCTS_COLLECTION?process.env.PRODUCTS_COLLECTION:'products');
            const productsfromMongo = (await productsCollection.find().toArray()) as ProductDAO[];
            const productsDomain: Product[] = productsfromMongo.map(product => product.DAOtoEntity(product));
            return productsDomain;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    saveUser = async (user:User): Promise<void> => {
        try {
            const connection = await this.getConnection();
            const usersCollection =  connection.collection(process.env.USERS_COLLECTION?process.env.USERS_COLLECTION:'users');
            await usersCollection.insertOne(user);
        } catch (error) {
            console.log(error);
            
        }
    }

    getUser = async (email: string): Promise<User|null> => {
        try {
            const connection = await this.getConnection();
            const usersCollection =  connection.collection(process.env.USERS_COLLECTION?process.env.USERS_COLLECTION:'users');
            const usersFromMongo: UserDAO = (await usersCollection.findOne({"email":email})) as UserDAO;
            if(usersFromMongo){
                return usersFromMongo.DAOToEntity();
            }
            return null;
        } catch (error) {
            console.log();
            return null;
        }
    }
}