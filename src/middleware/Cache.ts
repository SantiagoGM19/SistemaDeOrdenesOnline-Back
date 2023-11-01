import {createClient}from "redis";
import MongoConnection from "../services/impls/mongoService";
import Verificador from "./Verificador";
import { Request, Response } from "express";

export default class Cache extends Verificador{

    client =  createClient();
    mongoService = new MongoConnection();
    
    async verificar(req: Request, res: Response) {
        if (req.url === "/products") {
            await this.client.connect();
            const productos: string | null = await this.client.get('productos');
            if(productos){
                await this.client.quit()
                return res.status(201).send(JSON.parse(productos?productos:""));
            }else{
                const productsFromMongo = await this.mongoService.getProducts();
                await this.client.set('productos', JSON.stringify(productsFromMongo));
                await this.client.quit()
                return res.status(201).send(productsFromMongo);
            }
        }        
    }
}