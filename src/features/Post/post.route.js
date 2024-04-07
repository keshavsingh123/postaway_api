import express from "express";
import PostController from "./post.controller.js";

export const postRouter = express.Router();
const postController = new PostController();

postRouter.post("/", (req, res) => {
  postController.createPost(req, res);
});
postRouter.get("/", (req, res) => {
    postController.getAll(req, res);
  });
  postRouter.get("/:id", (req, res) => {
    postController.getOne(req, res);
  });
  postRouter.delete("/:id", (req, res) => {
    postController.deletePost(req, res);
  });
  postRouter.put("/:id", (req, res) => {
    postController.updatePost(req, res);
  });