import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";


export const userSignUp = async (req: Request, res: Response) => {

  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already exist" });
  }

  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  await newUser.save();
  return res.json({ status: true, message: "user registration successfull" });
};

export const userLogin = async (req: Request, res: Response) => {

  const { email, password } = req.body;
  const secret = process.env.KEY;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }
  if (!secret) {
    throw new Error('Secret key is missing');
  }
  const token = jwt.sign(
    { username: user.username, userid: user.id },
    secret,
    {
      expiresIn: "1h",
    }
  ); 
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({
    status: true,
    message: "login successfully",
    userId: user.id,

  });
};