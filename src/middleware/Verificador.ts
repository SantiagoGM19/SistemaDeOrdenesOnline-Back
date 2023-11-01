abstract class Verificador{

    protected proximaVerificacion:Verificador|null = null;

    
    abstract verificar(infoSolicitud:any):any;

    protected puedeEjecutar():boolean{
        return this.proximaVerificacion != null;
    }

    setProximaVerificacion(proximaVerificacion:Verificador){
        this.proximaVerificacion = proximaVerificacion;
    }
}