class UserDoesNotExist extends Error{
    constructor(message: string){
        super(message);
    }
}

class UserCredentialsIncorrect extends Error{
    constructor(message: string){
        super(message);
    }
}