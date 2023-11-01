import {createClient}from "redis";
import MongoConnection from "../services/impls/mongoService";
import Verificador from "./Verificador";
import { Request, Response } from "express";

export default class Cache extends Verificador{

    client =  createClient();
    mongoService = new MongoConnection();
    
    async verificar(req: Request, res: Response) {
        const productos: string | null = await this.client.get('productos');
        if(productos){
            return res.status(200).send(JSON.parse(productos));
        }
        const productsFromMongo = this.mongoService.getProducts();
        await this.client.set('productos', JSON.stringify(productsFromMongo));
        return res.status(200).send(productsFromMongo);
    }
}