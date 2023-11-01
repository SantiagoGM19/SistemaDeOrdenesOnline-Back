import jwt from "jsonwebtoken";

export const createToken = (payload: any): string => {
    const token = jwt.sign(payload, process.env.PRIVATE_KEY_JWT as string, {expiresIn: "60m"});
    return token;
};

export const verifyToken = (token: string): boolean => {
    try {
        return Object.keys(jwt.verify(token, process.env.PRIVATE_KEY_JWT as string)).length > 0;
    } catch (error) {
        return false;
    }
};