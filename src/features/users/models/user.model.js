import { getDB } from "../../../config/mongodb.js";
import ApplicationError from "../../../error-handlers/application.errors.js";

export default class UserModel{
    constructor( name, email, password, type,id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;  //changing the id to _id for matching the id with mongodb server
    }  

    // static async signUp(name,email,password,type){

   

    //     try {
    //              // 1. Get Database
    //              const db = getDB();

    //             //  2. Create Collection
    //             const collection = db.collection("users");
           
    //         await collection.insertOne(newUser);
    //         return newUser;
    //     } catch (error) {
    //         throw new ApplicationError("Something Went Wrong in DB",500);
    //     }
       
    // }
    // static signIn(email,password){
    //     const result = users.find((user) =>{
    //          return user.email == email && user.password== password
    //     });
    //     return result;

    // }
    static getAll(){
        return users;
    }
    
}

var users = [
    {
        id:1,
        name:"Seller User",
        email:"Seller12@gmail.com",
        password:"Seller@123",
        type:"Seller"
    },
    {
        id:2,
        name:"Customer User",
        email:"Customer12@gmail.com",
        password:"Customer@123",
        type:"Customer"
    }
]
