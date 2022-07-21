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
            console.log(deletedComment.post)
            await Post.findByIdAndUpdate({ _id: postId }, { $pull: { comments: deletedComment._id } })
            res.status(201)
            res.json(deletedComment)
        } else {
            res.status(400);
            throw new Error("Deleting comment failed");
        }
    }
}

export default CommentController;