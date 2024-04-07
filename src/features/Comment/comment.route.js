import express from "express";
import CommentController from "./comment.controller.js";

export const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post("/:id", (req, res) => {
  commentController.createComment(req, res);
});