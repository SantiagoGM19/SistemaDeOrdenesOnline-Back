import { Request, Response } from "express";
import EnsambladorDeVerificaciones from "./EnsambladorDeVerificaciones";

export default class Middleware{

    private ensamblador:EnsambladorDeVerificaciones;

    constructor(){
        this.ensamblador = new EnsambladorDeVerificaciones();
    }

    realizarVerificaciones = (req: Request, res: Response) => {
            const verificacionGeneral = this.ensamblador.usarSaneador()
            .usarAutenticador()
            .usarFiltroDeSolicitudes()
            .usarCache()
            .build();
            verificacionGeneral.verificar(req, res)
    }
}