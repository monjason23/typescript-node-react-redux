import express from 'express';
import asyncHandler from 'express-async-handler';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const userRouter = express.Router();

userRouter.post('/login', asyncHandler(UserController.loginUser));
userRouter.post('/regiser', asyncHandler(UserController.createUser));
userRouter.get('/details', asyncHandler(AuthMiddleware.protectRoute), asyncHandler(UserController.getUserDetails));

export default userRouter;