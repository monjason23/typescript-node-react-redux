import express from 'express';
import asyncHandler from 'express-async-handler';
import CommentController from '../controllers/comment.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const commentRouter = express.Router();

commentRouter.use(asyncHandler(AuthMiddleware.protectRoute));

commentRouter.post('/add', asyncHandler(CommentController.addComment));
commentRouter.delete('/delete', asyncHandler(CommentController.deleteComment));

export default commentRouter;