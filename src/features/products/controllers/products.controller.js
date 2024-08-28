import ProductModel from "../models/products.model.js";
import ProductRepository from "../products.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res) {
    try {
      let products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  }
  async addProducts(req, res) {
    try {
      const { name,desc, price, sizes, category } = req.body;
      const newProducts = new ProductModel(
        name,
        desc,
        req.file.filename,
        category,
        parseFloat(price),
        sizes.split(",")
      );
      // console.log(newProducts);
      const createdRecord = await this.productRepository.add(newProducts);
      console.log("Post Request is Received");
      console.log(createdRecord);
      res.status(201).send(createdRecord);
    } catch (err) {
      res.status(400).send(err);
    }
  }
  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      let productFound = await this.productRepository.get(id);
      if (!productFound) {
        res.status(404).send("Products Not Found");
      } else {
        return res.status(200).send(productFound);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
  async rateProducts(req, res, next) {
    try {
      const userID = req.userId;
      const productId = req.body.productId;
      const rating = req.body.rating;
      await this.productRepository.rate(userID, productId, rating);
      return res.status(200).send("Rating Added Successfully");
    } catch (error) {
      res.status(400).send(err);
    }
  }
  async filerProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;

      console.log(req.query);
      const result = await this.productRepository.filter(
        minPrice,
        maxPrice,
        category
      );
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(err);
    }
  }
  async averagePricePerCategory(req, res) {
    try {
      const result = await this.productRepository.averageProductPerCategory();
      res.status(200).send(result);
    } catch (err) {
      console.log(error);
      res.send("Somthing went wrong");
    }
  }
}
