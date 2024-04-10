import express from "express";
import LikeController from "./like.controller.js";

export const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.post("/:postId",(req,res)=>{
    likeController.addLike(req,res)
})
likeRouter.get("/:postId",(req,res)=>{
    likeController.getLike(req,res)
})
likeRouter.get("/toggle/:postId",(req,res)=>{
    likeController.toggleLike(req,res)
})