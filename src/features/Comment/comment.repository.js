import CommentModel from "./comment.schema.js"
import { AppError } from "../../Error_Handler/applicationError.js";
import { ObjectId } from "mongodb";
import PostModel from "../Post/post.schema.js";


export default class CommentRepository{
    async createComment(userID,postId,content){
        console.log(userID);
        try{
            const commentData = new CommentModel({
                        userID:new ObjectId(userID),
                        postId:new ObjectId(postId),
                        content:content
            })
            const savedComment = await commentData.save();

            const post = await PostModel.findById(new ObjectId(postId))
            post.comments.push(savedComment._id)
            await post.save();

            return savedComment
            
        }catch(err){
            console.log(err);
            throw new AppError("somw went wrong in d/b",500)
        }
    }
    async getAll(postId){
        console.log(postId);
        try{
            const getComment = PostModel.find({_id:new ObjectId(postId)})
            return getComment
        }catch(err){
            console.log(err);
            throw new AppError("somw went wrong in d/b",500)
    }
}
    async deleteComment(postId, commentId) {
        try {
          // Step 1: Remove comment from post document
          const updatedPost = await PostModel.findByIdAndUpdate(
            postId=new ObjectId(postId),
            { $pull: { comments: commentId } },
            { new: true }
          );
      
          if (!updatedPost) {
            throw new Error('Post not found');
          }
      
          // Step 2: Delete comment document from comments collection
          const deletedComment = await CommentModel.findByIdAndDelete(commentId);
          if (!deletedComment) {
            throw new Error('Comment not found');
          }
      
          return { post: updatedPost, comment: deletedComment };
        } catch (error) {
          throw new Error('Error deleting comment');
        }
      }
      async updateCom(commentId,content){
        try{
          const updatedComment = await CommentModel.findByIdAndUpdate(
            commentId=new ObjectId(commentId),
            { content },
            { new: true }
          );
      
          if (!updatedComment) {
            throw new Error('Comment not found');
          }
      
          return updatedComment;
        }catch(err){
          console.log(err);
        }
      }
}