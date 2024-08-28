import mongoose from "mongoose";

import { userSchema } from "./users.schema.js";
import ApplicationError from "../../error-handlers/application.errors.js";

const userModel = mongoose.model("users", userSchema);

export default class UserRepository {
  async signUp(user) {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong in DB", 500);
    }
  }
  async findByEmail(email){
    try {
        return await userModel.findOne({email})
    } catch (error) {
        throw new ApplicationError("Invalid Credentials",404)
    }
  }
  async resetPassword(userId,hashedPassword){
    try {
        let user = await userModel.findById(userId);
        user.password = hashedPassword;
        user.save();
    } catch (error) {
        console.log(error);
    }
  }

}
