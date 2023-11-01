import { Request, Response } from "express";

export default abstract class Verificador{

    protected proximaVerificacion:Verificador|null = null;

    
    abstract verificar(req: Request, res: Response):any;

    protected puedeEjecutar():boolean{
        return this.proximaVerificacion != null;
    }

    setProximaVerificacion(proximaVerificacion:Verificador){
        this.proximaVerificacion = proximaVerificacion;
    }
    
    getProximaVerificacion(){
        return this.proximaVerificacion;
    }
}