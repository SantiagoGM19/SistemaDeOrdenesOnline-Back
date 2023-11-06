import { NextFunction, Request, Response } from "express";
import Verificador from "./Verificador";
import { verifyToken } from "./utils/jwt";

export default class Autenticador extends Verificador{
    
    
    async verificar(req: Request, res: Response, next: NextFunction) {
        const tokenFromHeader:any =  req.headers.token;
        if(!verifyToken(tokenFromHeader)){
            req.body.solicitudFallida = true;
        }
        if(this.puedeEjecutar()){
           await this.proximaVerificacion?.verificar(req, res, next);  
        }
    }
    
}