import mongoose from "mongoose";

export const reviewSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
    },
    rating:Number
})