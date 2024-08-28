import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handlers/application.errors.js";
export default class UserRepository{
    constructor (){
        this.collection = "users";
    }
    async signUp(newUser){
        try {
            // 1. Get Database
            const db = getDB();

           //  2. Create Collection
           const collection = db.collection(this.collection);
       
       await collection.insertOne(newUser);
       return newUser;
   } catch (error) {
       throw new ApplicationError("Something Went Wrong in DB",500);
   }
    }

    async findByEmail(email){
        try {
            const db = getDB();

            const collection = db.collection(this.collection);
            return await collection.findOne({email})
        } catch (error) {
            throw new ApplicationError("Invalid Credentials",404)
        }
    }
}