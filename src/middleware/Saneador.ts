import { Request, Response } from "express";
import Verificador from "./Verificador";
import User from "../model/User";
import { OrderDTO } from "../model/OrderDTO";

export default class Saneador extends Verificador{
    
    verificar(req: Request, res: Response){
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/
        const object: User | OrderDTO = req.body
        if(object instanceof User){
            const validacionEmail = regex.test(object.getEmail());
            if(!validacionEmail){
                return res.status(400).send({message:"El email no es correcto"});
            }
            this.proximaVerificacion?.verificar(req, res);
        }
        if(object instanceof OrderDTO){
            if(object.getProducts.length === 0){
                return res.status(400).send({message:"La lista de la orden debe tener por lo menos un producto"});
            }
            this.proximaVerificacion?.verificar(req, res);
        }
        if(Object.keys(object).length === 0){
            this.proximaVerificacion?.verificar(req,res);
        }
    }
    
}