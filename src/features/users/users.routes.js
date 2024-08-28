// 1.importing Express

import express  from "express";
import UserController from "./controllers/users.controller.js";
import {userValidationMiddleware,loginValidationMiddleware} from "../../middlewares/file-validation.middleware.js";
import jwtAuth from "../../middlewares/jwt-Auth.middleware.js"
// 2 Instantiating Router Module

const userRoutes = express.Router()
const userController = new UserController();

userRoutes.post("/signup",userValidationMiddleware,(req,res)=>{
    userController.register(req,res);
});
userRoutes.post("/signin",loginValidationMiddleware,(req,res)=>{
    userController.login(req,res);
});
userRoutes.put("/resetPassword",jwtAuth,(req,res)=>{
userController.resetPassword(req,res);
})


export default userRoutes;