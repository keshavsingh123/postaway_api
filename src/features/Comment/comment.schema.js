import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    postId : {type:mongoose.Schema.Types.ObjectId,ref:"Post"},
    content:String

})

const CommentModel = mongoose.model('Comment', CommentSchema);
export default CommentModel