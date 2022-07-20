import express from 'express';
import asyncHandler from 'express-async-handler';
import PostController from '../controllers/post.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const postRouter = express.Router();

postRouter.use(asyncHandler(AuthMiddleware.protectRoute));

postRouter.post('/create', asyncHandler(PostController.createPost));
postRouter.delete('/delete/:id', asyncHandler(PostController.deletePost));
postRouter.put('/update/:id', asyncHandler(PostController.updatePost));
postRouter.get('/details/:id', asyncHandler(PostController.getPostDetails));
postRouter.get('/user/:id', asyncHandler(PostController.getUserPosts))

export default postRouter;