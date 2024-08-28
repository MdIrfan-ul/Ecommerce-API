import OrderModel from "../models/order.models.js";

import OrderRepository from "../order.repository.js";

export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();
    }
    async placeOrder(req,res){
        try {
            const userId = req.userId;
            await this.orderRepository.placeOrder(userId);
            res.status(201).send("Order is Created");

        } catch (error) {
            console.log(error);
            return res.send("something went wrong");
        }
    }
}