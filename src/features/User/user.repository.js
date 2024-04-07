import { AppError } from "../../Error_Handler/applicationError.js";
import  UserModel  from "./user.schema.js";

export default class UserRepository {
  async signUp(user) {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      console.log(newUser);
      return newUser;
    } catch (err) {
      throw new AppError("Something went wrong with data base", 500);
    }
  }
  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });
    } catch (err) {
      throw new AppError("Something went wrong with data base", 500);
    }
  }
  async findByMail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      throw new AppError(
        "Something went wrong with findbyemail data base",
        500
      );
    }
  }
}
