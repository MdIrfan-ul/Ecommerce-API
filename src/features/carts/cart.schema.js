import mongoose from "mongoose";

export const cartSchema = mongoose.Schema({
    userId:{type:ObjectId,ref:'users'},
    productId:{type:ObjectId,ref:'products'},
    quantity:Number
})