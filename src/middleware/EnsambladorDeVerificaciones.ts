import Autenticador from "./Autenticador";
import Cache from "./Cache";
import FiltroDeSolicitudes from "./FiltroDeSolicitudes";
import Saneador from "./Saneador";
import Verificador from "./Verificador";

export default class EnsambladorDeVerificaciones{

    private verificaciones:Verificador[] = [];

    constructor(verificaciones?: Verificador[]){
        if(verificaciones){
            this.verificaciones = verificaciones;
        }else{
            this.verificaciones = []
        }
    }

    build(){
        return this.verificaciones[0]
    }

    usarSaneador = (): EnsambladorDeVerificaciones => {
        const saneador = new Saneador();
        const verificaciones = this.agregarVerificacion(saneador);
        return new EnsambladorDeVerificaciones(verificaciones)
    }

    usarAutenticador = ():EnsambladorDeVerificaciones => {
        const autenticador = new Autenticador();
        const verificaciones = this.agregarVerificacion(autenticador);
        return new EnsambladorDeVerificaciones(verificaciones)
    };

    usarFiltroDeSolicitudes = (): EnsambladorDeVerificaciones => {
        const filtroDeSolicitudes = new FiltroDeSolicitudes();
        const verificaciones =  this.agregarVerificacion(filtroDeSolicitudes);
        return new EnsambladorDeVerificaciones(verificaciones)
    };

    usarCache = ():EnsambladorDeVerificaciones => {
        const cache = new Cache();
        const verificaciones = this.agregarVerificacion(cache);
        return new EnsambladorDeVerificaciones(verificaciones)
    };

    private agregarVerificacion = (verificador: Verificador): Verificador[] => {
        if(this.verificaciones.length === 0){
            this.verificaciones.push(verificador);
        }else{
            this.verificaciones[this.verificaciones.length-1].setProximaVerificacion(verificador);
            this.verificaciones.push(verificador);
        }
        return this.verificaciones;
    }

}