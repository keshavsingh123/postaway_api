import PostModel from "../Post/post.schema.js";
import LikeModel from "./like.schema.js";
import { ObjectId } from "mongodb";


export default class LikeRepository{
    async addLike(postId,userID) {
        try {
            const newLike = new LikeModel({
                postId: new ObjectId(postId),
                userID : new ObjectId(userID)
            });
            const savedLike = await newLike.save();

            const post = await PostModel.findById(new ObjectId(postId))
            post.likes.push(savedLike._id)
            await post.save();

            return savedLike;
        } catch (error) {
            console.error("Error adding like:", error);
            throw error; 
        }
    }
    async getLike(postId) {
        try {
          const getLike = PostModel.find( {_id:new ObjectId(postId)})
          return getLike
        } catch (err) {
            console.log(err);
            console.log("unable to get like");
        }
      }
      async deleteLike(postId, likeId) {
        try {
          // Step 1: Remove comment from post document
          const updatedPost = await PostModel.findByIdAndUpdate(
            postId=new ObjectId(postId),
            { $pull: { likes: likeId } },
            { new: true }
          );
      
          if (!updatedPost) {
            throw new Error('Post not found');
          }
      
          // Step 2: Delete comment document from comments collection
          const deletedLike = await LikeModel.findByIdAndDelete(likeId);
          if (!deletedLike) {
            throw new Error('Comment not found');
          }
      
          return { post: updatedPost, like: deletedLike };
        } catch (error) {
          throw new Error('Error deleting comment',error);

        }
      }
}