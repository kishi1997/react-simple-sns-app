import axios from 'axios';
import { getToken } from '../storage/storage';


export const apiRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT_BASIC_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

apiRequest.interceptors.request.use(
    config => {
        const userToken = getToken();
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


apiRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { status } = error.response;
        switch (status) {
            case 400:
                return Promise.reject(error.response);
            case 401:
                return "Unauthorized";
            case 404:
                return Promise.reject(error.response?.status);
            case 500:
                return "server error";
            default:
                return Promise.reject(error.response?.data);
        }
    }
);
