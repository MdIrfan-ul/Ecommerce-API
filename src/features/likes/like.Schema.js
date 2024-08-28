import mongoose from "mongoose";

export const likeSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    likeable:{type:mongoose.Schema.Types.ObjectId,
    refPath:"types"},
    types:{type:String,
    enum:["products","categories"]}
})