
import LikeRepository from "./like.repository.js";
export default class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }
    async addLike(req,res){
        const postId = req.params.id;
        // const userID = req.userID;
        const addLike = await this.likeRepository.addLike(postId)
        if(!addLike){
            res.status(400).send("like not found")
        }else{
            res.status(200).send("Like added here",addLike)
        }

    }
    // async getLike(req,res){
    //     try{
    //         const postId = req.params.postId;
    //     const like = this.likeRepository.getLike(postId);
    //     res.status(201).send(like);
    //     }catch(err){
    //         console.log(err);
    //         res.status(400).send("unable to get Like")
    //      }
    // }
    // async toggleLike(req,res){
    // const postId = req.params.id;
    // const userId = req.userId;
    // console.log(postId, userId);
    // const toggle = LikeModel.toggleLike(postId, userId);
    // if (toggle ==-1) {
    //   return res.status(201).send("Liked Successfully");
    // } else {
    //   return res.status(201).send("Unliked Successfully");
    // }
    // }
}