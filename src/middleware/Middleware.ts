import EnsambladorDeVerificaciones from "./EnsambladorDeVerificaciones";

class Middleware{

    private ensamblador:EnsambladorDeVerificaciones;

    constructor(){
        this.ensamblador = new EnsambladorDeVerificaciones();
    }

    realizarVerificaciones = () => { 
        
    }
}