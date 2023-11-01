import { UserDTOConToken } from "../../model/UserDTO";

export default interface IUserService{
    login(user:User): Promise<UserDTOConToken>
    signin(user: User): Promise<string>
}