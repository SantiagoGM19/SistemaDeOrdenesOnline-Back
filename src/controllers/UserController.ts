import { Request, Response } from "express";
import {UserDTOFactory, UserDTOSinRol} from "../model/UserDTO";
import IUserService from "../services/interfaces/IUserService";
import { UserCredentialsIncorrect, UserDoesNotExist } from "../model/exceptions/DomainExceptions";

export default class UserController{

    private userService: IUserService;

    constructor(userService: IUserService){
        this.userService = userService;
    }

    login = async (req: Request, res: Response) => {
        try {
            const user: UserDTOSinRol = req.body;
            const userConToken = await this.userService.login(UserDTOFactory.DTOToEntity(user));
            return res.status(202).send({userConToken:userConToken, message: "Usuario autorizado", status:202})
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
            const token = await this.userService.signin(UserDTOFactory.DTOToEntity(user));
            return res.status(200).send({token:token, message: "Usuario registrado"})
        } catch (error) {
            return res.status(500).send({message: "Ocurrio un error en el servidor"})
        }
    }
}