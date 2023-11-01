import User from "./User";

export class UserDTOFactory{
    public static DTOToEntity = (UserDTOSinRol: UserDTOSinRol) =>{
        return new User(UserDTOSinRol.email, UserDTOSinRol.encryptedPassword, "usuario_normal")
    }
}

export interface UserDTOSinRol{
    email: string,
    encryptedPassword: string
}

export interface UserDTOConToken{
    user: User,
    token: String
}