class IpBloqueadaError extends Error{
    constructor(message: string){
        super(message)
    }
}

class AutenticacionError extends Error{
    constructor(message: string){
        super(message)
    }
}

class ChainError extends Error{
    constructor(message: string){
        super(message);
    }
}