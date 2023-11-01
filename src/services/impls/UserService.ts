import { createToken } from "../../middleware/utils/jwt";
import User from "../../model/User";
import { UserDTOConToken } from "../../model/UserDTO";
import { UserCredentialsIncorrect, UserDoesNotExist } from "../../model/exceptions/DomainExceptions";
import IDataBase from "../interfaces/IDataBase";
import IUserService from "../interfaces/IUserService";

export default class UserService implements IUserService{

    private dbService: IDataBase;

    constructor(dbService: IDataBase) {
        this.dbService = dbService;
    }

    login = async (user: User): Promise<UserDTOConToken> => {
        const email = user.getEmail();
        const userFromDataBase =  await this.dbService.getUser(email);
        if(userFromDataBase){
            const isCorrectLogin = userFromDataBase.getEncryptedPassword() === user.getEncryptedPassword();
            if(isCorrectLogin){
                return {
                    user: userFromDataBase,
                    token: createToken({email: user.getEmail()})
                }
            }
            throw new UserCredentialsIncorrect("email o contraseña no correcto")
        }
        throw new UserDoesNotExist("usuario no existe")
    }

    signin = async(user: User): Promise<string> => {
        await this.dbService.saveUser(user)
        return createToken({email: user.getEmail()})
    }
}