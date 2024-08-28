import express from "express";

import OrderController from "./controllers/order.controllers.js";



const orderRoutes = express.Router();

const orderController = new OrderController();

orderRoutes.post("/",(req,res)=>{
    orderController.placeOrder(req,res);
})


export default orderRoutes;