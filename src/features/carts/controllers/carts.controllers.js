import CartRepository from "../carts.repository.js";
import CartModel from "../models/carts.model.js";

export default class CartsController {
  constructor() {
    this.cartRepository = new CartRepository();
  }
  async addCarts(req, res, next) {
    try {
      const {productId,quantity } = req.body;
      const userId = req.userId;
      await this.cartRepository.add(productId, userId, quantity);
      res.status(201).send("Cart is updated");
    } catch (err) {
      console.log(err);
      res.send("Something went Wrong");
    }
  }

  async getCart(req, res, next) {
    try {
      const userId = req.userId;
      const cart = await this.cartRepository.get(userId);
      console.log("Cart Item Displayed Successfully");
      res.status(200).send(cart);
    } catch (err) {
      console.log(err);
      res.send("Somthing went Wrong");
    }
  }
  // updateCart(req, res) {
  //     const userId = req.userId;
  //     const productId = req.params.id; // Assuming productId is passed as a parameter in the URL
  //     const { quantity } = req.body;

  //     // Call the update method from the CartModel
  //     const updatedCart = CartModel.update(userId, productId, quantity);

  //     // Check if the update was successful
  //     if (typeof updatedCart == 'string') {
  //         // If the update failed, return a 404 Not Found response
  //         return res.status(404).send(updatedCart);
  //     }

  //     // If the update was successful, return a 200 OK response with the updated cart
  //     console.log("Cart Item Updated Successfully")
  //     res.status(200).send("Cart Item Updated Successfully");
  // }

 async deleteCart(req, res) {
    try {
        const userId = req.userId;
    const cartId = req.params.id;
    const isRemoved = await this.cartRepository.delete(userId,cartId);
    if (!isRemoved) {
        return res.status(404).send("Cart not found");
      } 
        console.log("Cart Item Removed Successfully");
        return res.status(200).send("Cart is Removed");
    } catch (error) {
        console.log(error);
        res.send("Somenthing went wrong")
    }
    
    
  }
}
