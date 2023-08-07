import axios from 'axios';
import { userToken } from '../storage/storage';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { errorDialogOpenState } from '../atom/state/error';
import { errorState } from '../atom/state/error';


export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT_BASIC_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
    }
})

export function useAxiosInterceptors() {
    const [error, setError] = useRecoilState(errorState);
    const [errorDialogOpen, setErrorDialogOpen] = useRecoilState(errorDialogOpenState);
    useEffect(() => {
        const responseInterceptor = instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.message || 'Undefined error')
                    setErrorDialogOpen(true);
                    console.log()
                } else {
                    setError('Undefined error');
                    setErrorDialogOpen(true);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);
}