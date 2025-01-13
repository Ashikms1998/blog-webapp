import express, { Router, Request, Response } from 'express';
import { userSignUp, userLogin } from '../controller/userAuth'

const router: Router = express.Router();

router.post('/signup', userSignUp)
router.post('/login', userLogin)

export default router