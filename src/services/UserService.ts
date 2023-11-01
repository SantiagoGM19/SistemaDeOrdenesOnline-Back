import MongoConnection from "./mongoService";

export default class UserService{

    private dbService: IDataBase;

    constructor(dbService: IDataBase) {
        this.dbService = dbService;
    }

    login = async (user: User): Promise<boolean> => {
        const email = user.getEmail();
        const userFromDataBase =  await this.dbService.getUser(email);
        if(userFromDataBase){
            return userFromDataBase.getEncryptedPassword() === user.getEncryptedPassword()
        }
        return false;
    }

    signin = async(user: User): Promise<void> => {
        await this.dbService.saveUser(user)
    }
}