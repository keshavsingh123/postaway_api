import PostRepository from "../Post/post.repository.js";
import CommentRepository from "./comment.repository.js";


export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
        this.postRepository = new PostRepository();
    }
    async createComment(req,res){
            const userID=req.userID;
            const postId=req.params;
            const {content} = req.body;
        try{
            
            const comment =await this.commentRepository.createComment(userID,postId,content)
            res.status(200).send(comment)
        }catch(err){
            console.log(err);
            res.status(400).send("unable to create comment")
        }
    }
    async getAll(req,res){
        try{
            const postId = req.params;
            const getComment = await this.commentRepository.getAll(postId)
            res.status(200).send(getComment)
        }catch(err){
            console.log(err);
            res.status(400).send("unable to getOne comment")
    }
}
    async deleteOne(req,res){
        try{
            const {postId,commentId} = req.params
            const delComment = await this.commentRepository.deleteComment(postId,commentId)
            if(delComment){
               return res.status(200).send("comment deleted successsfully!")
            }else{
               return res.status(400).send("Not found comment")

            }
        }catch(err){
            console.log(err);
            res.status(400).send("unable to delete comment")
         }
    }
        async updateComment(req,res){
            try{
                const { commentId } = req.params;
                const { content } = req.body;
                const updateCom = await this.commentRepository.updateCom(commentId,content);
               
                res.status(200).send(updateCom)
            }catch(err){
            console.log(err);
            res.status(400).send("unable to update comment")
         }
        }
}