import { AxiosError } from "axios";
import clientReq from "../utils/api";

export interface ICommentData {
    content: string;
    postId: string;
    commentId: string;
}

class CommentController {
    static addComment = async (data: Pick<ICommentData, 'postId' | 'content'>) => {
        try {
            const response = await clientReq.post('/comment/add', data);
            return response.data;
        } catch(error) {
            const err = error as AxiosError;
            console.log(err.message);
        }
    }

    static deleteComment = async (data: Pick<ICommentData, 'postId' | 'commentId'>) => {
        try {
            const response = await clientReq.post('/comment/delete', data);
            return response.data;
        } catch(error) {
            const err = error as AxiosError;
            console.log(err.message);
        }
    }

    static editComment = async (data: ICommentData) => {
        try {
            const response = await clientReq.post('/comment/edit', data);
            return response.data;
        } catch(error) {
            const err = error as AxiosError;
            console.log(err.message);
        }
    }
}

export default CommentController;
