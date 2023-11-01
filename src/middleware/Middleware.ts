import { Request, Response } from "express";
import EnsambladorDeVerificaciones from "./EnsambladorDeVerificaciones";

class Middleware{

    private ensamblador:EnsambladorDeVerificaciones;

    constructor(){
        this.ensamblador = new EnsambladorDeVerificaciones();
    }

    realizarVerificaciones = (req: Request, res: Response) => {
            const verificacionGeneral = this.ensamblador.usarAutenticador()
            .usarFiltroDeSolicitudes()
            .usarCache()
            .build();
            verificacionGeneral.verificar(req, res)
    }
}