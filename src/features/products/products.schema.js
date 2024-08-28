import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
    name:String,
    desc:String,
    imageUrl:String,
    category:String,
    price:Number,
    sizes:Array,
    stocks:Number,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'review'
        }
    ],
    category:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'category'
        }
    ]

})