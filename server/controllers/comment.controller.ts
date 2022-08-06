import { Request, Response } from "express";
import Comment from "../models/comment.model";
import Post from "../models/post.model";

class CommentController {
    static addComment = async (req: Request, res: Response) => {
        const { content, postId } = req.body;

        if(!content || !postId) {
            res.status(400);
            throw new Error('Incorrect data');
        }

        const comment = new Comment({ user: req.user._id, post: postId, content });
        const newComment = await comment.save();

        await Post.findByIdAndUpdate({ _id: postId }, { $push: { comments: newComment._id } })

        if(newComment) {
            res.status(201)
            res.json(newComment)
        } else {
            res.status(400);
            throw new Error("Adding comment failed");
        }
    }

    static deleteComment = async (req: Request, res: Response) => {
        const { commentId, postId } = req.body;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if(deletedComment) {
            await Post.findByIdAndUpdate({ _id: postId }, { $pull: { comments: deletedComment._id } })
            res.status(201)
            res.json(deletedComment)
        } else {
            res.status(400);
            throw new Error("Deleting comment failed");
        }
    }

    static editComment = async (req: Request, res: Response) => {
        const { commentId, postId, content } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true })

        if(updatedComment) {
            await Post.findByIdAndUpdate({ _id: postId }, { $push: { comments: updatedComment._id } },  { new: true, upsert: true })
            res.status(201)
            res.json(updatedComment)
        } else {
            res.status(400);
            throw new Error("Deleting comment failed");
        }
    }
}

export default CommentController;