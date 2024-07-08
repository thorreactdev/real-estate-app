import User from "../models/userModel.js";
import bycryptjs from "bcryptjs";
import { errorHandler } from "../utils/erroMessage.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bycryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid Email"));
    }
    const validPassword = bycryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password : pass , ...rest} = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
