// 1. Importing Express

import express from "express";
import ProductController from "./controllers/products.controller.js";
import { upload } from "../../middlewares/file-upload.middleware.js";
import { addValidationMiddleware } from "../../middlewares/file-validation.middleware.js";

const productRoutes = express.Router();

const productController = new ProductController();

productRoutes.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
productRoutes.post(
  "/",
  upload.single("imageUrl"),
  addValidationMiddleware,
  (req, res) => {
    productController.addProducts(req, res);
  }
);
productRoutes.post("/rate", (req,res)=>{
    productController.rateProducts(req,res);
});
productRoutes.get("/filter", (req, res) => {
  productController.filerProducts(req, res);
});
productRoutes.get("/averagePrice",(req,res)=>{
  productController.averagePricePerCategory(req,res);
})

productRoutes.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});

export default productRoutes;
