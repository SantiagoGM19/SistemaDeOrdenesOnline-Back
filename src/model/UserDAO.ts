import {ObjectId} from "mongodb";

export default class UserDAO{
    constructor(
        public _id: ObjectId,
        public email: string,
        public encryptedPassword: string,
        public rol: string
    ){}

    DAOToEntity(): User{
        return new User(this.email, this.encryptedPassword, this.rol);
    }

    static EntityToDAO(user: User): UserDAO{
        return new UserDAO(new ObjectId(), user.getEmail(), user.getEncryptedPassword(), "usuario_normal");
    }
}