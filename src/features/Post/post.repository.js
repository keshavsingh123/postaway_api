import { AppError } from "../../Error_Handler/applicationError.js";
import PostModel from "./post.schema.js";
import { ObjectId } from "mongodb";


export default class PostRepository{
    async getAll(){
        try{
            const posts =  await PostModel.find()
            return posts
        }catch(err){
            throw new AppError("something went wrong in d/b", 500);
        }
    }
    
    async createPost(userID,postData){
        try{
            const newPost = await new PostModel(
                {userID:new ObjectId(userID),
                   caption: postData.caption,
                   imageUrl:postData.imageUrl
                }
            )
            return await newPost.save();
        }catch (err) {
            throw new AppError("something went wrong in d/b", 500);      
    }
    }
    async getOne(userID){
        console.log(userID+"repo");
        try{
           return await PostModel.findOne({userID:new ObjectId(userID)})


        }catch (err) {
            throw new AppError("something went wrong in d/b", 500);
    }
}
    async updatePost(userID,postId,caption,imageUrl){
        try{
            const updatedPost = await PostModel.findByIdAndUpdate(
                postId=new ObjectId(postId),
            { 
                caption,
                imageUrl,
                // Assuming you want to match both userID and _id for the post
                userID: new ObjectId(userID),
            },
            { new: true }
        );

        if (!updatedPost) {
            throw new Error('Post not found');
        }

        return updatedPost;
        }catch (err) {
            console.log(err);
            throw new AppError("something went wrong in d/b", 500);
    }
    }
      
    async deletePost(userID,postId){
        try{
            const delPost = await PostModel.deleteOne({
                userID:new ObjectId(userID),
                _id:new ObjectId(postId)
            })
            
            if (delPost.deletedCount > 0) {
                return delPost; // Post deleted successfully
              } else {
                throw new AppError("Post not found"); // Throw an error if post was not deleted
              }
            
        }catch (err) {
            throw new AppError("something went wrong in d/b", 500);
    }
    }
}