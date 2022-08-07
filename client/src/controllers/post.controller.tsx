import { AxiosError } from "axios";
import clientReq from "../utils/api";

export interface IPostData {
    content: string;
    title: string;
    postId: string;
    userId: string;
}
class PostController {
    static createPost = async (data: Pick<IPostData, 'content' | 'title'>) => {
        try {
            const response = await clientReq.post('/post/create', data);
            return response.data; 
        } catch (error) {
            const err = error as AxiosError;
            console.log(err.message);
        }
    }

    static deletePost = async (data: Pick<IPostData, 'postId'>) => {
        try {
            const response = await clientReq.post(`/post/delete/${data.postId}`);
            return response.data; 
        } catch (error) {
            const err = error as AxiosError;
            console.log(err.message);
        }
    }

    static updatePost = async (data: Pick<IPostData, 'postId'>) => {
        try {
            const response = await clientReq.post(`/post/update/${data.postId}`);
            return response.data; 
        } catch (error) {
            const err = error as AxiosError;
            console.log(err.message);
        }
    }

    static likePost = async () => {

    }

    static getPostDetails = async () => {

    }
}

export default PostController;
