import jwt from "jsonwebtoken";

const PRIVATE_KEY_JWT = "32xIQpWAPk3yw1kracVy5US825UATwd8YvnGL/9ro1O1EahsOE3Rq6jATCV92Ag31fyzAVKRgNriVIPeFvAAw+9bfDY1ppliwO0eUwoJYhaPcKk3Qk5hKfcY";

export const createToken = (payload: any): string => {
    const token = jwt.sign(payload, PRIVATE_KEY_JWT, {expiresIn: "60m"});
    return token;
};

export const verifyToken = (token: string): boolean => {
    try {
        return Object.keys(jwt.verify(token, PRIVATE_KEY_JWT)).length > 0;
    } catch (error) {
        return false;
    }
};