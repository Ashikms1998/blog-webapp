import express, { Router, Request, Response } from 'express';
import { userSignUp, userLogin, createBlog,fetchBlogs,fetchingBlog,deleteBlog,updatingBlog} from '../controller/userAuth'
import { upload } from '../middleware/multerConfig';

const router: Router = express.Router();

router.post('/signup', userSignUp)
router.post('/login', userLogin)
router.post('/createblog', upload.single('image'),createBlog)
router.get("/fetchblogs",fetchBlogs)
router.get("/blog/:blogid",fetchingBlog)
router.delete("/deleteblog/:blogid",deleteBlog)
router.put("/updateblog", upload.single('image'), updatingBlog)
export default router