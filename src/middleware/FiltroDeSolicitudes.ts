import { NextFunction, Request, Response } from "express";
import Verificador from "./Verificador";

export default class FiltroDeSolicitudes extends Verificador{

    private conteoIPRequest: Map<string|undefined, { intentos: number, ultimoRequest: number }> = new Map();  
    private ipBloqueadas: Map<string|undefined, number> = new Map();
    private intentosMaximos: number = 5;
    private tiempoMaximoBloqueo: number = 60000; //milisegundos
    private tiempoLimite: number = 30000; //milisegundos
    
    async verificar(req: Request, res: Response,  next: NextFunction) {
        const ip = req.ip;
        const route = req.url;
        const key = `${ip}_${route}`;
        const tiempoActual = Date.now();
        const intentosRequest = this.conteoIPRequest.get(key)?.intentos || 0;
        const ultimoRequest = this.conteoIPRequest.get(key)?.ultimoRequest || tiempoActual;

        if (intentosRequest >= this.intentosMaximos && tiempoActual - ultimoRequest <= this.tiempoLimite) {
            
            const tiempoBloqueo = this.ipBloqueadas.get(ip+'_bloqueada');
            
            if (!tiempoBloqueo) {                    
                this.bloquearIP(ip, tiempoActual);
                return res.status(403).send({message: "Esta IP está bloqueada por múltiples solicitudes"});
            }else if (tiempoActual-tiempoBloqueo >= this.tiempoMaximoBloqueo){
                this.limpiarBloqueo(ip, tiempoActual);
            }else{
                return res.status(403).send({message: "Esta IP está bloqueada por múltiples solicitudes"});
            }
        } else {
            this.conteoIPRequest.set(key, {intentos: intentosRequest + 1, ultimoRequest:tiempoActual});
            if(this.puedeEjecutar()){
                await this.proximaVerificacion?.verificar(req, res, next);
            }
        }
    }

    bloquearIP(ip: string|undefined, tiempoActual:number){
        this.ipBloqueadas.set(ip+'_bloqueada', tiempoActual);
    }

    limpiarBloqueo(ip: string|undefined, tiempoActual: number){
        this.conteoIPRequest.set(ip, {intentos: 1, ultimoRequest:tiempoActual});
        this.ipBloqueadas.delete(ip);
    }
}