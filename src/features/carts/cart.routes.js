import express from "express";
import CartsController from "./controllers/carts.controllers.js";

const cartRoutes = express.Router();

const cartsController = new CartsController();

cartRoutes.post("/", (req, res) => {
  cartsController.addCarts(req, res);
});
// cartRoutes.put("/:id",cartsController.updateCart);
cartRoutes.get("/",(req,res)=>{
    cartsController.getCart(req,res);
});
cartRoutes.delete("/:id", (req,res)=>{
    cartsController.deleteCart(req,res);
});

export default cartRoutes;
