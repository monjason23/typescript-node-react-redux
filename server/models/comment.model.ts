import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
    user: mongoose.Schema.Types.ObjectId,
    content: string,
    title: string,
    likes: Array<{ username: string, createdAt: string }>,
    post: mongoose.Schema.Types.ObjectId
}

export interface ICommentSchema extends IComment, Document {}

const CommentSchema = new Schema<ICommentSchema>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide user"],
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide post id"],
        ref: 'Post'
    },
    content: {
        type: String,
        required: [true, "Please provide content"]
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }]
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)
export default Comment;