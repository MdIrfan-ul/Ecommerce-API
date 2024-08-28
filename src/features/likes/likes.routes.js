import express from "express";
import LikeController from "./like.controller.js";

const likeRoutes = express.Router();

const likeController = new LikeController();

likeRoutes.post("/", (req, res) => {
  likeController.likeItem(req, res);
});

likeRoutes.get("/", (req, res) => {
    likeController.getLikes(req, res);
});

likeRoutes.get("/users", (req, res) => {
    likeController.userLikes(req, res);
  });

export default likeRoutes;