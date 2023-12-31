import { NextFunction, Request, Response } from "express";
import Verificador from "./Verificador";
import User from "../model/User";
import { OrderDTO } from "../model/OrderDTO";

export default class Saneador extends Verificador{
    
    async verificar(req: Request, res: Response, next: NextFunction){
        const object = req.body;
        if(Object.keys(object).length === 0){
            this.proximaVerificacion?.verificar(req, res, next);
        }else if(Object.assign(new OrderDTO(object.products), object).getProducts().length === 0){
            return res.status(400).send({message:"La lista de la orden debe tener por lo menos un producto"});
        }else{
            await this.proximaVerificacion?.verificar(req, res, next);
        }
    }
    
}