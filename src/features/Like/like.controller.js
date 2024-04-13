import LikeRepository from "./like.repository.js";
export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async addLike(req, res) {
    const postId = req.params;
    const userID = req.userID;
    try {
      const addLike = await this.likeRepository.addLike(postId, userID);
      console.log(postId,userID);
      if (!addLike) {
        res.status(400).send("like not found");
      } else {
        res.status(201).json(addLike);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("unable to add like");
    }
  }
  async getLike(req, res) {
    try {
      const postId = req.params;
      const like = await this.likeRepository.getLike(postId);
      res.status(201).json(like);
    } catch (err) {
      console.log(err);
      res.status(400).send("unable to get Like");
    }
  }
  async deleteOne(req,res){
    try{
        const {postId,likeId} = req.params
        const delLike = await this.likeRepository.deleteLike(postId,likeId)
        if(delLike){
           return res.status(200).send("comment deleted successsfully!")
        }else{
           return res.status(400).send("Not found comment")

        }
    }catch(err){
        console.log(err);
        res.status(400).send("unable to delete comment")
     }
}
}