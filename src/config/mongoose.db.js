import mongoose from "mongoose";
import { categorySchema } from "../features/products/category.schema.js";

const url = process.env.DB_URL;
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("<----->Connected Using Mongoose On Mongodb<----->");
    addCategory();
  } catch (error) {
    console.log("Something went wrong while connecting to DataBase");
    console.log(error);
  }
};

async function addCategory() {
  const categoryModel = mongoose.model("category", categorySchema);
  const categories = await categoryModel.find();
  if (!categories || categories.length == 0) {
    await categoryModel.insertMany([{ name: "Books" }, { name: "Clothing" },{name:"Electronics"}]);
  }
  console.log("Categories are added");
}
