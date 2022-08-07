import express from 'express';
import asyncHandler from 'express-async-handler';
import PostController from '../controllers/post.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const postRouter = express.Router();

postRouter.use(asyncHandler(AuthMiddleware.protectRoute));

postRouter.post('/create', asyncHandler(PostController.createPost));
postRouter.delete('/delete/:postId', asyncHandler(PostController.deletePost));
postRouter.put('/update/:postId', asyncHandler(PostController.updatePost));
postRouter.get('/details/:postId', asyncHandler(PostController.getPostDetails));
postRouter.get('/user/:postId', asyncHandler(PostController.getUserPosts))

export default postRouter;