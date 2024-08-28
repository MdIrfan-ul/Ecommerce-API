import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handlers/application.errors.js";
import mongoose from "mongoose";
import { productSchema } from "./products.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel = mongoose.model("products", productSchema);
const ReviewModel = mongoose.model("review", reviewSchema);
const CategoryModel = mongoose.model("category", categorySchema);
class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(newProduct) {
    try {
      // 1. ADD THE PRODUCT
      console.log(newProduct);
      newProduct.category = newProduct.category.split(",").map((e) => e.trim());
      console.log(newProduct);

      const newdata = new ProductModel(newProduct);
      const savedData = await newdata.save();

      // 2.UPDATE THE CATEGORIES

      await CategoryModel.updateMany(
        {
          _id: { $in: newProduct.category },
        },
        { $push: { products: new ObjectId(savedData._id) } }
      );

    } catch (err) {
      throw new ApplicationError("Error While Adding the Product", 400);
    }
  }
  async getAll() {
    try {
      const db = getDB();

      const collection = db.collection(this.collection);
      const result = await collection.find().toArray();
      console.log(result);
      return result;
    } catch (error) {
      throw new ApplicationError(
        "Something went wrong while getting the data",
        400
      );
    }
  }
  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong");
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();

      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      const result = await collection.find(filterExpression).toArray();
      console.log(result);
      return result;
    } catch (error) {
      throw new ApplicationError(
        "Something went wrong while getting the data",
        400
      );
    }
  }

  async rate(userId, productId, rating) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new ApplicationError("Unable to find the product");
      }
      const user = await ReviewModel.findOne({
        productId: new ObjectId(productId),
        userId: new ObjectId(userId),
      });
      if (user) {
        user.rating = rating;
        await user.save();
      } else {
        const newReview = await new ReviewModel({
          productId: new ObjectId(productId),
          userId: new ObjectId(userId),
          rating: rating,
        });
        await newReview.save();
      }
    } catch (error) {
      throw new ApplicationError("Something went wrong in the database");
    }
  }
  async averageProductPerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          {
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong in the database", 404);
    }
  }
}

export default ProductRepository;
