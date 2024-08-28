import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async likeItem(req, res, next) {
    try {
      const { id, type } = req.body;
      const userId = req.userId;
      if (type != "products" && type == "categories") {
        res.status(400).send("Invalid type");
      }
      if (type == "products") {
       const productLikes= this.likeRepository.likeProduct(userId, id);
        res.status(200).send("Product Liked Successfully");

      } else {
        const categorylikes = this.likeRepository.likeCategory(userId, id);
        res.status(200).send("Category Liked Successfully");

      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
  async getLikes(req, res) {
    try {
      const { id, type } = req.query;
      const likes = await this.likeRepository.getLikes(type, id);
      return res.status(200).send(likes);
    } catch (error) {
      console.log(error);
    }
  }
  async userLikes(req,res){
    const userId = req.userId; // Retrieve userId from token

    try {
      const likeCount = await this.likeRepository.getLikeCountByUser(userId);
      res.status(200).json({ likeCount });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}
}
