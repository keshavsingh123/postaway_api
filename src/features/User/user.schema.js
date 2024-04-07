import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});
 const UserModel = mongoose.model("User", UserSchema);
export default UserModel;