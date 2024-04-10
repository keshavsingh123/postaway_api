import express from "express";
import CommentController from "./comment.controller.js";

export const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post("/:id", (req, res) => {  //postId
  commentController.createComment(req, res);
});
commentRouter.get("/:id", (req, res) => {//postId
  commentController.getAll(req, res);
});
commentRouter.delete("/:postId/:commentId", (req, res) => {//commentId
  commentController.deleteOne(req, res);
});
commentRouter.put("/:commentId", (req, res) => {//commentId
  commentController.updateComment(req, res);
});