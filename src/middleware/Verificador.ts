abstract class Verificador{

    protected proximaVerificacion:Verificador|null = null;

    
    abstract verificar(infoSolicitud:any):any;

    protected pudeEjecutar():boolean{
        return this.proximaVerificacion != null;
    }

    setProximaVerificacion(proximaVerificacion:Verificador){
        this.proximaVerificacion = proximaVerificacion;
    }
}