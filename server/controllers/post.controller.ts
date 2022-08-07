import { Request, Response } from "express";
import Post from "../models/post.model"
import User from "../models/user.model";

class PostController {
    static createPost = async (req: Request, res: Response) => {
        const { content, title } = req.body;

        if(!content || !title) {
            res.status(400);
            throw new Error('Please provide all necessary info')
        }

        const post = new Post({ content, title, user: req.user._id });
        const newPost = await post.save();

        await User.findByIdAndUpdate({ _id: req.user.id }, { $push : { posts: newPost._id } });
        
        if(newPost) {
            res.status(201)
            res.json(newPost)
        } else {
            res.status(400);
            throw new Error("Post creation failed");
        }
    }

    static deletePost = async (req: Request, res: Response) => {
        const { postId } = req.params;
        if(!postId) {
            res.status(400);
            throw new Error('Please provide id')
        }

        const deletedPost = await Post.findByIdAndDelete(postId);

        if(deletedPost) {
            await User.findByIdAndUpdate({ _id: req.user.id }, { $pull : { posts: deletedPost._id } });

            res.status(201)
            res.json(deletedPost)
        } else {
            res.status(400);
            throw new Error("Post deletion failed");
        }
    }

    static updatePost = async (req: Request, res: Response) => {
        const { postId } = req.params;
        if(!postId) {
            res.status(400);
            throw new Error('Please provide id')
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });

        if(updatedPost) {
            res.status(201)
            res.json(updatedPost)
        } else {
            res.status(400);
            throw new Error("Post deletion failed");
        }
    }

    static getUserPosts = async (req: Request, res: Response) => {
        const { postId } = req.params;
        const { userId } = req.body;
        if(!postId) {
            res.status(400);
            throw new Error('Please provide id')
        }

        const posts = await Post.find({ user: userId });

        if(posts) {
            res.status(201)
            res.json(posts)
        } else {
            res.status(400);
            throw new Error("Get all posts failed");
        }
    }

    static getPostDetails = async (req: Request, res: Response) => {
        const { postId } = req.params;
        if(!postId) {
            res.status(400);
            throw new Error('Please provide id')
        }
        
        const post = await Post.findOne({ id: postId });

        if(post) {
            res.status(201)
            res.json(post)
        } else {
            res.status(400);
            throw new Error("Get post details failed");
        }
    }
}

export default PostController;