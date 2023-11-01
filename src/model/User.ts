class User{
    private email: string
    private encryptedPassword: string

    constructor(email: string, encryptedPassword: string){
        this.email = email;
        this.encryptedPassword = encryptedPassword;
    }

    getEmail(){
        return this.email;
    }

    getEncryptedPassword(){
        return this.encryptedPassword;
    }
}