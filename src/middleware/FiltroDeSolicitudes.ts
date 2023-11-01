import { Request, Response } from "express";
import Verificador from "./Verificador";

export default class FiltroDeSolicitudes extends Verificador{

    private conteoIPRequest: Map<string|undefined, number> = new Map();  
    private ipBloqueadas: Map<string|undefined, number> = new Map();
    private intentosMaximos: number = 3;
    private tiempoMaximoBloqueo: number = 60000; //milisegundos
    
    verificar(req: Request, res: Response) {
        if (req.body.solicitudFallida) {
            const ip = req.ip;
            const intentosRequest = this.conteoIPRequest.get(ip) || 0;

            if (intentosRequest >= this.intentosMaximos) {
                const tiempoActual = Date.now();
                const tiempoBloqueo = this.ipBloqueadas.get(ip+'_bloqueada');
                if (!tiempoBloqueo) {                    
                    this.bloquearIP(ip, tiempoActual);
                    return res.status(403).send({message: "Esta IP está bloqueada por varios intentos fallidos"})
                }else if (tiempoActual-tiempoBloqueo >= this.tiempoMaximoBloqueo){
                    this.limpiarBloqueo(ip);
                    return res.status(401).send({message: "La solicitud falló"})
                }else{
                    return res.status(403).send({message: "Esta IP está bloqueada por varios intentos fallidos"})
                }
            } else {
                this.conteoIPRequest.set(ip, intentosRequest + 1);
                return res.status(401).send({message: "La solicitud falló"})
            }
        }else{
            if(this.puedeEjecutar()){
                this.proximaVerificacion?.verificar(req, res);
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