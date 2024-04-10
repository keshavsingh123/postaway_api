import PostModel from "../Post/post.schema.js";
import LikeModel from "./like.schema.js";
import { ObjectId } from "mongodb";


export default class LikeRepository{
    async addLike(postId) {
        console.log(postId);

        try {
            const newLike = new LikeModel({
                postId: new ObjectId(postId),
                // userID : new ObjectId(userID)
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
}