import express from "express";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "./user.schema.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res, next) {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({name, email, password:hashedPassword});
      console.log(user);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      //   res.status(400).send("Unable to signup request");
      next(err);
    }
  }
  async signIn(req, res) {
    try {
      const user = await this.userRepository.findByMail(req.body.email);
      if (!user) {
        res.status(400).send("user not found !");
      } else {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = jwt.sign(
            { userID: user._id },
            "F942DDF91A4AC1D5FC1222481C459",
            { expiresIn: "1h" }
          );
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (err) {
        console.log(err);
      res.status(400).send("Unable to signin request");
    }
  }
}
