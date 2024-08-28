import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "../users.repository.js";
import bcrypt from "bcrypt";

 export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async register(req,res){
        try {
            const {name,email,password,type} = req.body;
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser  = new UserModel(name,email,hashedPassword,type);
            await this.userRepository.signUp(newUser);
            console.log(newUser);
            res.status(201).send(newUser);
        } catch (error) {
            res.status(400).send(error);
        }

     }
     async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password; // Store the password from request body
            
            // Find user by email
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(400).send("Invalid Email");
            } else {
                // Compare plain text password with hashed password
                const passwordMatch = await bcrypt.compare(password, user.password);
                console.log("Password Match Result:", passwordMatch); // Debug logging
                
                if (passwordMatch) {
                    const token = jwt.sign({ userID: user._id, userEmail: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
                    return res.status(200).send(token);
                } else {
                    return res.status(400).send("Incorrect Credentials");
                }
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }
    async resetPassword(req,res){
        try {
            const {newPassword} = req.body;
            const hashedPassword = await bcrypt.hash(newPassword,10);
            const userId=req.userId;
            await this.userRepository.resetPassword(userId,hashedPassword);
            res.status(200).send("Password updated");
        } catch (error) {
            console.log(error);
            res.status(500).send("Something went wrong");
        }
    }
    
    
    
}

