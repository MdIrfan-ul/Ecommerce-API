export default class CartModel{
    constructor(userId,productId,quantity,id){
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.id = id;
    }

    static add(userId,productId,quantity){
        if(!productId){
            return "product is Invalid";
        }
        if(!quantity){
            return "Quantity must be Entered"
        }
        // Check if the product is already in the cart
    const existingCartIndex = carts.findIndex(cart => cart.userId == userId && cart.productId == productId);

    if (existingCartIndex !== -1) {
        // If the product is already in the cart, update its quantity
        carts[existingCartIndex].quantity += quantity;
        return carts[existingCartIndex];
    } else {
        // If the product is not in the cart, add a new cart
        const newCart = new CartModel(userId, productId, quantity, carts.length + 1);
        carts.push(newCart);
        // return newCart;
    }
    }
    static getAll(userId){
       return carts.filter(user=>user.userId == userId);
    }
    // static update(userId, productId, quantity) {
    //     const userIndex = carts.findIndex(cart => cart.userId == userId && cart.productId == productId);
    //     if (userIndex == -1) {
    //         return "Invalid User or Product";
    //     }
    //     if (!quantity) {
    //         return "Quantity must be Entered";
    //     }
    //     carts[userIndex].quantity = quantity;
    //     return carts[userIndex]; // Return the updated cart
    // }
    
    static remove(cartId, userId) {
        const cartIndex = carts.findIndex(cart => cart.id == cartId && cart.userId == userId);
        if (cartIndex == -1) {
            return "Cart not found";
        }else{
        carts.splice(cartIndex, 1);
        }
    }
    
}

var carts = [
    new CartModel(1,2,1,1),
    new CartModel(2,2,4,2)

]