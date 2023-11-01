import { Router } from "express";
import UserController from "../controllers/UserController";
import UserService from "../services/impls/UserService";
import MongoConnection from "../services/impls/mongoService";

const authRouter =  Router();

const repository =  new MongoConnection();
const userService =  new UserService(repository);
const userController = new UserController(userService);

authRouter.post("/", userController.signin.bind(userController));
authRouter.post("/login", userController.login.bind(userController));

export default authRouter;