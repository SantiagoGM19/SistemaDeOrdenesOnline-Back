class User{
    private email: string
    private encryptedPassword: string
    private rol:string

    constructor(email: string, encryptedPassword: string, rol:string){
        this.email = email;
        this.encryptedPassword = encryptedPassword;
        this.rol = rol;
    }

    getEmail(){
        return this.email;
    }

    getEncryptedPassword(){
        return this.encryptedPassword;
    }
}