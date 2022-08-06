import mongoose, { Document, Schema } from "mongoose";

export enum PostStatus {
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC",
    FRIENDS_ONLY = "FRIENDS_ONLY"
}

export interface IPost {
    user: mongoose.Schema.Types.ObjectId,
    content: string,
    title: string,
    status: PostStatus,
    likes: Array<mongoose.Schema.Types.ObjectId>
    comments: Array<mongoose.Schema.Types.ObjectId>
}

export interface IPostSchema extends IPost, Document {}

const PostSchema  = new Schema<IPostSchema>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide user"],
        ref: 'User'
    },
    content: {
        type: String,
        required: [true, "Please provide content"]
    },
    title: {
        type: String,
        required: [true, "Please provide title"]
    },  
    status: {
        type: String,
        enum: PostStatus,
        default: PostStatus.PUBLIC,
        required: [true, "Please provide status"],
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Comment'
    }],
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }]
}, {
    timestamps: true
});

PostSchema.virtual('commentsLength').get(function() {
    return this.comments.length
})

const Post = mongoose.model('Post', PostSchema)

export default Post;