export class UserDoesNotExist extends Error{
    constructor(message: string){
        super(message);
    }
}

export class UserCredentialsIncorrect extends Error{
    constructor(message: string){
        super(message);
    }
}