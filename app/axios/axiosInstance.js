import axios from 'axios';
import { userToken } from '../storage/storage';

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT_BASIC_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

instance.interceptors.request.use(function (config) {
    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});