import { userRouter } from "../User/user.route.js";
import PostRepository from "./post.repository.js";
import PostModel from "./post.schema.js";


export default class PostController{
    constructor(){
        this.postRepository = new PostRepository();
    }
    async getAll(req,res){
        try{
            var posts = await this.postRepository.getAll()
            res.status(200).send(posts)
        }catch(err){
            console.log(err);
            return res.status(400).send("can't find posts");

        }
    }
    async createPost(req,res){
        const {caption,imageUrl} = req.body;
        const userID = req.userID
        try{
            const newPost = new PostModel({caption,imageUrl})
            const createdRecord = await this.postRepository.createPost(userID,newPost);
            if(createdRecord){
            return res.status(200).send("post created successfully")
            }else{
            return res.status(400).send("unable to create post record")

            }
        }catch(err){
            console.log(err);
            return res.status(400).send("Unable to create post");

        }
    }
    async getOne(req,res){
        try{
            // const id = req.params.id
            const userID = req.userID
            console.log(userID);
            const getById = await this.postRepository.getOne(userID)
            if(!getById){
               return res.status(401).send("post not found")
            }else{
               return res.status(200).send(getById)
            }
        }catch(err){
            console.log(err);
            return res.status(400).send("can't find by id");
    }
}
    async deletePost(req,res){
        
        try{
            const userID = req.userID
            const postId = req.params.id
            const isdelete = await this.postRepository.deletePost(userID,postId)
            if(!isdelete){
                return res.status(400).send("post not  found");
            }else{
                return res.status(200).send("post deleted successfully")
            }

        }catch(err){
            console.log(err);
            return res.status(400).send("can't delete post");
        }
    }
    async updatePost(req,res){
        try{
            const userID=req.userID;
            const postId = req.params.id;
            const {caption,imageUrl} = req.body
           const post = await this.postRepository.updatePost(userID,postId,caption,imageUrl)
           if (!post) {
            res.status(404).json("post not found!!");
          } else {
            res.status(200).json(post);
          }
        }catch(err){
            console.log(err);
            return res.status(400).send("can't update post");
        }
    }
}