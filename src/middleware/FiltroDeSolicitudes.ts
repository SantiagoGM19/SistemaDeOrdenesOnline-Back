import Verificador from "./Verificador";

export default class FiltroDeSolicitudes extends Verificador{

    private conteoIPRequest: Map<string, number> = new Map();  
    private ipBloqueadas: Map<string, number> = new Map();
    private intentosMaximos: number = 3;
    private tiempoMaximoBloqueo: number = 60000; //milisegundos
    
    verificar(infoSolicitud: any) {

        if (infoSolicitud.solicitudFallida) {
            const ip = infoSolicitud.connection.remoteAddress;
            const intentosRequest = this.conteoIPRequest.get(ip) || 0;

            if (intentosRequest >= this.intentosMaximos) {
                const tiempoActual = Date.now();
                const tiempoBloqueo = this.ipBloqueadas.get(ip+'_bloqueada');
                if (!tiempoBloqueo) {
                    this.bloquearIP(ip, tiempoActual);
                }else if (tiempoActual-tiempoBloqueo >= this.tiempoMaximoBloqueo){
                    this.limpiarBloqueo(ip);
                }else{
                    throw new IpBloqueadaError('Esta IP está bloqueada por varios intentos fallidos');
                }
            } else {
                this.conteoIPRequest.set(ip, intentosRequest + 1);
            }
        }

        if(this.puedeEjecutar()){
            this.proximaVerificacion?.verificar(infoSolicitud);
        }
    }

    bloquearIP(ip: string, tiempoActual:number){
        this.ipBloqueadas.set(ip+'_bloqueada', tiempoActual);
    }

    limpiarBloqueo(ip: string){
        this.conteoIPRequest.set(ip, 1);
        this.ipBloqueadas.delete(ip);
    }
}