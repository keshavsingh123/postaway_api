import express from "express";
import { userRouter } from "./src/features/User/user.route.js";
import bodyParser from "body-parser";
import { connectMongooseToMongoDB } from "./src/config/mongooseConfig.js";
import { postRouter } from "./src/features/Post/post.route.js";
import JwtAuth from "./src/Middleware/jwt.middleware.js";
import { commentRouter } from "./src/features/Comment/comment.route.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/post",JwtAuth, postRouter);
app.use("/api/comment",JwtAuth, commentRouter);



app.get("/", (req, res) => {
  res.send("welcome to postAway api");
});
app.use((req, res) => {
  res
    .status(400)
    .send("You have entered wrong API. please check your documentation");
});
app.listen(3000, () => {
  console.log("server is listening on port 3000");
  connectMongooseToMongoDB();
});
