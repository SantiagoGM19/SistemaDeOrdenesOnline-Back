import { NextFunction, Request, Response } from "express";
import EnsambladorDeVerificaciones from "./EnsambladorDeVerificaciones";

export default class Middleware{

    private ensamblador:EnsambladorDeVerificaciones;

    constructor(){
        this.ensamblador = new EnsambladorDeVerificaciones();
    }

    realizarVerificaciones = async (req: Request, res: Response, next: NextFunction) => {
        const verificacionGeneral = this.ensamblador.usarSaneador()
            .usarAutenticador()
            .usarFiltroDeSolicitudes()
            .usarCache()
            .build();
        await verificacionGeneral.verificar(req, res, next);
    }
}