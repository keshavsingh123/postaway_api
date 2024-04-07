import CommentRepository from "./comment.repository.js";


export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
    }
    async createComment(req,res){
        try{
            const userID=req.userID;
            const postID=req.params.id;
            const {content} = req.body;
            const comment =await this.commentRepository.createComment(userID,postID,content)
            res.status(200).send(comment)
        }catch(err){
            console.log(err);
            res.status(400).send("unable to create comment")
        }
    }
}