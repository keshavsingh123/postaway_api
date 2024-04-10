import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema({
    userID : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    postId : {type:mongoose.Schema.Types.ObjectId,ref:"Post"},
    

})

const LikeModel = mongoose.model('Like', LikeSchema);
export default LikeModel