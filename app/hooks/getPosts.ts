import { postFactory } from "../models/post_model";
import { Pagination } from "../repositories/post_repository";

export default async function GetPosts(query: Pagination) {
    try {
        const response = await postFactory().index(query);
        return response;
    } catch (error) {
        console.error(error);
    }
};