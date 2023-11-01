import { createToken } from "../middleware/utils/jwt";
import MongoConnection from "./mongoService";

export default class UserService{

    private dbService: IDataBase;

    constructor(dbService: IDataBase) {
        this.dbService = dbService;
    }

    private login = async (user: User): Promise<string> => {
        const email = user.getEmail();
        const userFromDataBase =  await this.dbService.getUser(email);
        if(userFromDataBase){
            const isCorrectLogin = userFromDataBase.getEncryptedPassword() === user.getEncryptedPassword();
            if(isCorrectLogin){
                return createToken({email: user.getEmail()})
            }
            throw new Error("email o contraseña no correcto")
        }
        throw new Error("usuario no existe")
    }

    private signin = async(user: User): Promise<string> => {
        await this.dbService.saveUser(user)
        return createToken({email: user.getEmail()})
    }
}