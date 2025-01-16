import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Blog } from "../models/Blog";
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
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({
    status: true,
    message: "login successfully",
    userId: user.id,
    username:user.username
  });
};

export const createBlog = async (req: Request, res: Response) => {
  try {

    const { title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required.' });
  }
  const image = req.file.filename;
    const token = req.cookies.token;
    const key = process.env.KEY
    let decoded;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. Token is missing." });
    }

    if (!key) {
      return res.status(500).json({ error: "Server configuration error: KEY is not defined." });
    }
    try {
      decoded = jwt.verify(token, key) as { userid: string ,username:string };
    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }
    if (!decoded.userid) {
      return res.status(400).json({ error: "Invalid token." });
    }

    const newBlog = new Blog({
      title,
      description,
      image,
      username:decoded.username,
      createdBy: decoded.userid
    })
    const savedblog = await newBlog.save()
    return res
      .status(201)
      .json({ message: "Blog successfull created", blog: savedblog });
  } catch (error) {
    console.error("Error creating Blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating Blog." });
  }
};

export const fetchBlogs = async (req: Request, res: Response) => {

  try {
    const token = req.cookies.token;
    const key = process.env.KEY
    let decoded;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. Token is missing." });
    }

    if (!key) {
      return res.status(500).json({ error: "Server configuration error: KEY is not defined." });
    }
    try {
      decoded = jwt.verify(token, key) as { userid: string };
    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }
    if (!decoded.userid) {
      return res.status(400).json({ error: "Invalid token." });
    }

    const blogs = await Blog.find()
    return res
      .status(201)
      .json({ message: "Blogs successfully fetched", blogs});

  } catch (error) {
    console.error("Error fetching all Blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching all Blog." });
  }
}

export const fetchingBlog = async(req:Request,res:Response)=>{
  try {
    const {blogid} = req.params
    const blog = await Blog.findById(blogid)
    if(!blog){
      return res.status(401).json({ error: "Unauthorized. Blog id is missing." });
    }
    return res
    .status(201)
    .json({ message: "Blog successfully fetched", blog});

  } catch (error) {
    console.error("Error fetching Blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching Blog." });
  }
}

export const deleteBlog =async (req:Request,res:Response)=>{
  try {
    console.log("hello")
    const {blogid} = req.params
    const token = req.cookies.token;
    const key = process.env.KEY
    let decoded;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized. Token is missing." });
    }
    console.log(token)

    if (!key) {
      return res.status(500).json({ error: "Server configuration error: KEY is not defined." });
    }
    console.log(key)

    try {
      decoded = jwt.verify(token, key) as { userid: string };
console.log(decoded)

    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }
    if (!decoded.userid) {
      return res.status(400).json({ error: "Invalid token." });
    }
console.log(blogid)

let response;
    const blog = await Blog.findById(blogid)
    console.log(blogid,blog)
    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }
    if (blog.createdBy.toString() !== decoded.userid) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this blog." });
    }
    await Blog.findByIdAndDelete(blogid);
    return res.status(200).json({ message: "Blog successfully deleted." });

  } catch (error) {
    console.error("Error deleting Blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting Blog." });
  }
}


export const updatingBlog =async (req:Request,res:Response)=>{
  try {

    const {id, title, description } = req.body;

    const token = req.cookies.token;
    const key = process.env.KEY
    let decoded;
    if (!id||!title || !description) {
      return res.status(400).json({ error: "ID ,Title and description are required." });
    }

    if (!token || !key) {
      return res.status(401).json({ error: "Unauthorized or missing configuration." });
    }

    try {
      decoded = jwt.verify(token, key) as { userid: string ,username:string };
    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    const updateData: any = {
      title,
      description,
      updatedAt: new Date()
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );


    return res.status(200).json({ message: "Blog successfully updated", blog: updatedBlog });
  } catch (error) {
    console.error("Error creating Blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating Blog." });
  }
}