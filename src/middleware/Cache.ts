import {createClient}from "redis";
import MongoConnection from "../services/mongoService";

export default class Cache extends Verificador{

    client =  createClient();
    mongoService = new MongoConnection();
    
    async verificar(infoSolicitud: any): Promise<JSON|Product[]> {
        const productos: string | null = await this.client.get('productos');
        if(productos){
            return JSON.parse(productos);
        }
        const productsFromMongo = this.mongoService.getProducts();
        await this.client.set('productos', JSON.stringify(productsFromMongo));
        return productsFromMongo;
    }
}