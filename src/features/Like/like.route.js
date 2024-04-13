import express from "express";
import LikeController from "./like.controller.js";

export const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.post("/:id",(req,res)=>{
    likeController.addLike(req,res)
})
likeRouter.get("/:id",(req,res)=>{
    likeController.getLike(req,res)
})
likeRouter.delete("/:postId/:likeId",(req,res)=>{
    likeController.deleteOne(req,res)
})