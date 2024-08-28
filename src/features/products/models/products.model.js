import ApplicationError from "../../../error-handlers/application.errors.js";
import UserModel from "../../users/models/user.model.js";

export default class ProductModel{
    constructor(name,desc,imageUrl,category,price,sizes,rates,id){
       this.name =name;
       this.desc =desc;
       this.imageUrl = imageUrl;
       this.category = category;
       this.price =price;
       this.sizes = sizes;
       this._id =id; 
    }

    static getAll(){
        return products;
    }
    // static add(product){
    //     // let newProducts = new ProductModel(products.length+1,name,desc,imageUrl,category,price,sizes);
    //     product.id = products.length+1;
    //     products.push(product);
    //     return product;
    // }
    static getById(id){
        return products.find((product)=>product.id == id);
    }
    static getfilter(minPrice,maxPrice,category,rates){
        const result = products.filter(product=>{
                return (!minPrice ||product.price>=minPrice) &&(!maxPrice||product.price<=maxPrice)&&(!category||product.category==category);
        });
        return result;
    }
    static rateProduct(userID,productId,rating){
        // 1. Validate User and Product
        const user = UserModel.getAll().find(u=>u.id==userID)
        if(!user){
            throw new ApplicationError("User not found",404)
        }
          // 2. Validate  Product
        const product = products.find(p=>p.id==productId);
        if(!product){
            throw new ApplicationError("Product not found",404)

        }
        if(!product.ratings){
            product.ratings=[];
            product.ratings.push({userID:userID,rating:rating});
        } //3.Check If user rating is already available
        else{
            const existingRatingIndex = product.ratings.findIndex(r=>r.userID == userID);
            if(existingRatingIndex>=0){
                product.ratings[existingRatingIndex]={
                    userID:userID,rating:rating,
                }}
                else{
                    // 4. if no existing rating then add new rating
                    product.rating.push({userID:userID,rating:rating})
                }
            }

        }
    
}

var products =[
    new ProductModel(1,"IPhone","Created By Apple","https://m.media-amazon.com/images/I/31tyUh1todL._SY445_SX342_QL70_FMwebp_.jpg","Mobiles",15,["Mini","Normal","Pro","Pro-Max"]),
    new ProductModel(2,"Samsung","Created By Samsung","https://m.media-amazon.com/images/I/31mm3ZebkVL._SX300_SY300_QL70_FMwebp_.jpg","Mobiles",10,["Normal","Pro"]),
    new ProductModel(3,"Lenovo","Created By Lenovo","https://m.media-amazon.com/images/I/417PL2mg8+L._SX300_SY300_.jpg","Laptops",17,["i7","i11"])
];