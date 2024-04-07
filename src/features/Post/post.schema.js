import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    caption:{type:String},
    imageUrl:{type:String}
})

const PostModel = mongoose.model("Post",PostSchema)
export default PostModel