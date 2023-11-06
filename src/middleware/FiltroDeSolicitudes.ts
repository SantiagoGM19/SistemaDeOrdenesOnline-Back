import { NextFunction, Request, Response } from "express";
import Verificador from "./Verificador";

export default class FiltroDeSolicitudes extends Verificador{

    private conteoIPRequest: Map<string|undefined, number> = new Map();  
    private ipBloqueadas: Map<string|undefined, number> = new Map();
    private intentosMaximos: number = 5;
    private tiempoMaximoBloqueo: number = 60000; //milisegundos
    
    async verificar(req: Request, res: Response,  next: NextFunction) {
        const ip = req.ip;
        const intentosRequest = this.conteoIPRequest.get(ip) || 0;

        if (intentosRequest >= this.intentosMaximos) {
            const tiempoActual = Date.now();
            const tiempoBloqueo = this.ipBloqueadas.get(ip+'_bloqueada');
            if (!tiempoBloqueo) {                    
                this.bloquearIP(ip, tiempoActual);
                return res.status(403).send({message: "Esta IP está bloqueada por múltiples solicitudes"});
            }else if (tiempoActual-tiempoBloqueo >= this.tiempoMaximoBloqueo){
                this.limpiarBloqueo(ip);
            }else{
                return res.status(403).send({message: "Esta IP está bloqueada por múltiples solicitudes"});
            }
        } else {
            this.conteoIPRequest.set(ip, intentosRequest + 1);
            if(this.puedeEjecutar()){
                await this.proximaVerificacion?.verificar(req, res, next);
            }
        }
    }

    bloquearIP(ip: string|undefined, tiempoActual:number){
        this.ipBloqueadas.set(ip+'_bloqueada', tiempoActual);
    }

    limpiarBloqueo(ip: string|undefined){
        this.conteoIPRequest.set(ip, 1);
        this.ipBloqueadas.delete(ip);
    }
}