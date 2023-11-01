import {ObjectId} from "mongodb";
import User from "./User";

export default class UserDAOFactory{

    static DAOToEntity(user: UserDAO): User{
        return new User(user.email, user.encryptedPassword, user.rol);
    }

    static EntityToDAO(user: User): UserDAO{
        return {_id: new ObjectId(), 
            email: user.getEmail(),
            encryptedPassword: user.getEncryptedPassword(), 
            rol: "usuario_normal"};
    }
}

export interface UserDAO{
        _id: ObjectId,
        email: string,
        encryptedPassword: string,
        rol: string
}