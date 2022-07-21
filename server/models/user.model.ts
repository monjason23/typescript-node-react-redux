import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
    email: string,
    username: string,
    posts: Array<mongoose.Schema.Types.ObjectId>
}

export interface IUserSchema extends IUser, Document {
    password: string
}

const UserSchema: Schema = new Schema<IUserSchema>({
    email: {
        type: String,
        required: [true, "Please provide email"]
    },
    username: {
        type: String,
        required: [true, "Please provide username"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Post'
    }]
}, {
    timestamps: true
})

UserSchema.virtual('postsLength').get(function(){
    return this.posts.length
})

const User = mongoose.model("User", UserSchema)

export default User;