export class UserDTOSinRol{
    private email: string
    private encryptedPassword: string
    constructor(email: string, encryptedPassword: string){
        this.email = email;
        this.encryptedPassword = encryptedPassword;
    }
    DTOToEntity(){
        return new User(this.email, this.encryptedPassword, "usuario_normal")
    }
}

export interface UserDTOConToken{
    user: User,
    token: String
}