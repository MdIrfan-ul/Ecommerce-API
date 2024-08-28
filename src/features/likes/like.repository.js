import mongoose from "mongoose";
import { likeSchema } from "./like.Schema.js";
import { ObjectId } from "mongodb";

const likeModel = mongoose.model("likes", likeSchema);
export default class LikeRepository {
  async likeProduct(userId, productId) {
    try {
        const existingLike = await likeModel.findOne({
            user: new ObjectId(userId),
            likeable: new ObjectId(productId),
            types: "products",
          });
    
          if (existingLike) {
            throw new Error('User has already liked this product');
          }
    
          // If user hasn't liked the product, create a new like
          const newLike = new likeModel({
            user: new ObjectId(userId),
            likeable: new ObjectId(productId),
            types: "products",
          });
          await newLike.save();
    } catch (error) {
      console.log(error);
    }
  }
  async likeCategory(userId, categoryId) {
    try {
        const existingLike = await likeModel.findOne({
            user: new ObjectId(userId),
            likeable: new ObjectId(categoryId),
            types: "categories",
          });
    
          if (existingLike) {
            throw new Error('User has already liked this category');
          }
    
          // If user hasn't liked the category, create a new like
          const newLike = new likeModel({
            user: new ObjectId(userId),
            likeable: new ObjectId(categoryId),
            types: "categories",
          });
          await newLike.save();
    } catch (error) {
      console.log(error);
    }
  }
  async getLikes(type, id) {
    try {
      return await likeModel
        .find({
          likeable: new ObjectId(id),
          types: type,
        })
        .populate("user")
        .populate({ path :'likeable',model:type});
    } catch (error) {
      console.log(error);
    }
  }
}
