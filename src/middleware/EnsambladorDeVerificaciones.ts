import Autenticador from "./Autenticador";
import Cache from "./Cache";
import FiltroDeSolicitudes from "./FiltroDeSolicitudes";

export default class EnsambladorDeVerificaciones{

    private verificaciones:Verificador[] = [];

    usarAutenticador = ():Verificador => {
        const autenticador = new Autenticador();
        return this.agregarVerificacion(autenticador);
    };

    usarFiltroDeSolicitudes = (): Verificador => {
        const filtroDeSolicitudes = new FiltroDeSolicitudes();
        return this.agregarVerificacion(filtroDeSolicitudes);
    };

    usarCache = ():Verificador => {
        const cache = new Cache();
        return this.agregarVerificacion(cache);
    };

    private agregarVerificacion = (verificador: Verificador): Verificador => {
        if(this.verificaciones.length === 0){
            this.verificaciones.push(verificador);
        }else{
            this.verificaciones[this.verificaciones.length-1].setProximaVerificacion(verificador);
            this.verificaciones.push(verificador);
        }
        return this.verificaciones[0];
    }

}