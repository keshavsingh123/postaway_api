import CommentModel from "./comment.schema.js"
import { AppError } from "../../Error_Handler/applicationError.js";
import { ObjectId } from "mongodb";


export default class CommentRepository{
    async createComment(userID,postId,content){
        try{
            const newComment = new CommentModel({
                userID:new ObjectId(userID),
                _id:new ObjectId(postId),
                content:content

            })
            newComment.save();
            return newComment;
        }catch(err){
            console.log(err);
            throw new AppError("somw went wrong in d/b",500)
        }
    }
}