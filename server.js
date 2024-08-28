import "./env.js"

import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";

import productRoutes from "./src/features/products/products.routes.js";
import userRoutes from "./src/features/users/users.routes.js";
import cartRoutes from "./src/features/carts/cart.routes.js";
import orderRoutes from "./src/features/orders/order.routes.js";
import likeRoutes from "./src/features/likes/likes.routes.js";
import jwtAuth from "./src/middlewares/jwt-Auth.middleware.js";
import logMiddleware from "./src/middlewares/logger.middleware.js";
import apiDocs from "./swagger.json" assert{type:"json"};
import ApplicationError from "./src/error-handlers/application.errors.js";
import {connectToDB} from "./src/config/mongodb.js";
import { connectUsingMongoose } from "./src/config/mongoose.db.js";


const server = express();


const corsOptions = {
    origin:"http://localhost:5500",
    allowedHeaders: ['Content-Type']
}
server.use(express.json());
server.use(cors(corsOptions));
server.use(logMiddleware);

server.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

server.get("/",(req,res)=>{
    res.json("server Started")
});

server.use("/api/products",jwtAuth,productRoutes);
server.use("/api/user",userRoutes);
server.use("/api/carts",jwtAuth,cartRoutes);
server.use("/api/orders",jwtAuth,orderRoutes);
server.use("/api/likes",jwtAuth,likeRoutes);

server.use((req,res)=>{
    res.status(404).json("API Not Found. Please Verify the Document to know More Information at localhost:5000/api-docs");
})

server.use((err,req,res,next)=>{
console.log(err);
if(err instanceof ApplicationError){
    res.status(err.code).send(err.message);
}
// Server Error
res.status(500).send("Something Went Wrong Please Try Again Later");
})


server.listen(process.env.PORT,(req,res)=>{
    console.log(`server is listening at http://localhost:${process.env.PORT}`)
    // connectToDB();
    connectUsingMongoose();
})