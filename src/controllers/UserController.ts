import { Request, Response } from "express";
import {UserDTOSinRol} from "../model/UserDTO";
import IUserService from "../services/interfaces/IUserService";

export default class UserController{

    private userService: IUserService;

    constructor(userService: IUserService){
        this.userService = userService;
    }

    login = async (req: Request, res: Response) => {
        try {
            const user: UserDTOSinRol = req.body;
            const userConToken = await this.userService.login(user.DTOToEntity());
            return res.status(202).send({userConToken:userConToken, message: "Usuario autorizado"})
        } catch (error) {
            if(error instanceof UserDoesNotExist){
                return res.status(404).send({message: "El usuario no existe, no puede hacer login"});
            }
            if(error instanceof UserCredentialsIncorrect){
                return res.status(401).send({message: "Credenciales incorrectas"});
            }
            return res.status(500).send({message:"Ocurrio un error en el servidor"});
        }
    }

    signin = async (req: Request, res: Response) => {
        try {
            const user: UserDTOSinRol = req.body;
            await this.userService.signin(user.DTOToEntity());
            return res.status(200).send({message: "Usuario registrado"})
        } catch (error) {
            return res.status(500).send({message: "Ocurrio un error en el servidor"})
        }
    }
}