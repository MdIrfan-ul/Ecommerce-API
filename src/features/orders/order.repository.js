import { getDB, getClient } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import OrderModel from "./models/order.models.js";

export default class OrderRepository {
    constructor() {
        this.collection = "orders";
    }

    async placeOrder(userId) {
        const client = getClient();
        const session = client.startSession();
        try {
            session.startTransaction();

            // 1. Get cart items of user and calculate the total amount.
            const items = await this.getTotalAmount(userId, session);
            const finalTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);
            console.log(finalTotalAmount);

            // 2. Create a new order record.
            const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
            const db = getDB();
            await db.collection(this.collection).insertOne(newOrder, { session });

            // 3. Reduce the stock of products.
            for (let item of items) {
                await db.collection("products").updateOne(
                    { _id: item.productId },
                    { $inc: { stocks: -item.quantity } },
                    { session }
                );
            }

            // 4. Clear cart items.
            await db.collection("cartItems").deleteMany({ userId: new ObjectId(userId) }, { session });

            // Commit the transaction.
            await session.commitTransaction();
            session.endSession();
        } catch (err) {
            // If an error occurs, abort the transaction and end the session.
            await session.abortTransaction();
            session.endSession();
            console.error(err);
            throw err; // Rethrow the error to be handled elsewhere.
        }
    }

    async getTotalAmount(userId, session) {
        const db = getDB();
        const items = await db.collection("cartItems").aggregate([
            {
                $match: { userId: new ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                $unwind: "$productInfo"
            },
            {
                $addFields: {
                    "totalAmount": { $multiply: ["$productInfo.price", "$quantity"] }
                }
            }
        ], { session }).toArray();
        return items;
    }
}
