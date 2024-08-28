# eCommerce RESTful API

## Overview
This is a RESTful API for an eCommerce platform built using **Node.js**, **Express.js**, and **MongoDB**. The API provides features for managing users, products, carts, orders, likes, categories, and reviews. It includes JWT token-based authorization and is tested using Postman.

## Features
- **User Management**: Sign up, log in, and manage user profiles.
- **Product Management**: Create, update, delete, and retrieve product information.
- **Cart Management**: Add, update, and remove products from the user's cart.
- **Order Management**: Place and manage orders.
- **Likes**: Like and unlike products.
- **Categories**: Create and manage product categories.
- **Reviews**: Add, edit, and delete product reviews.
- **Authorization**: Secure endpoints using JWT tokens.
- **Error Handling**: Custom middleware for handling application errors.
- **File Validation**: Validate file uploads using **express-validator**.
- **File Upload**: Handle file uploads with **Multer**.
- **Logging**: Log application activities using **Winston**.
- **API Documentation**: Documented API using **Swagger**.

## Technologies Used
[![Languages Used](https://skillicons.dev/icons?i=js,nodejs,express,mongodb,postman,git,github)](https://skillicons.dev)

- **Backend**: Node.js, Express.js, MongoDB
- **Authorization**: JWT (JSON Web Token)
- **File Uploads**: Multer
- **Validation**: express-validator
- **Error Handling**: Custom Middleware
- **Logging**: Winston
- **API Documentation**: Swagger
- **API Testing**: Postman

## Installation

1. **Clone the repository**:
```bash
   git clone https://github.com/yourusername/ecommerce-api.git
```
```bash
cd ecommerce-api
```
2. **Install dependencies**:

```bash
npm install
```
3. **Set up environment variables: Create a .env file in the root directory and add the following**:

```bash
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=<your_desired_port>
```
4. **Start the server**:

```bash
npm start
```
5. **API Documentation**:
The API is documented using Swagger. After starting the server, you can view the documentation by navigating to:

```bash
localhost:5000/api-docs
```
6. **Testing**
The API has been tested using Postman. You can import the Postman collection provided in this repository to test the endpoints.

## Middleware

- **Authorization**: Protect routes with JWT.
- **Error Handling**: Handle errors using custom middleware.
- **Validation**: Validate incoming requests using express-validator.
- **File Uploads**: Manage file uploads with Multer.
- **Logging**: Log activities with Winston.

## Author
___

Developed with ❤️ by Mohamed Irfanullah M

___