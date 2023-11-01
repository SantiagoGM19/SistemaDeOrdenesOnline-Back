import { Request, Response } from "express";
import Verificador from "./Verificador";
import { verifyToken } from "./utils/jwt";

export default class Autenticador extends Verificador{
    
    verificar(req: Request, res: Response) {
        const tokenFromHeader:any =  req.headers.token;
        if(!verifyToken(tokenFromHeader)){
            req.body.solicitudFallida = true;
            if(this.pudeEjecutar()){
                this.proximaVerificacion?.verificar(req, res);
                res.status(202).send({message: "Usuario autorizado"});
            }
        }
        res.status(401).send({message: "Usuario no autorizado"})
    }
    
}