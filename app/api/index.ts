import axios, {AxiosInstance} from 'axios';
import {cookies} from "next/headers";

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8088/api',
})

api.interceptors.request.use(
    (config) => {
        const token = cookies().get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api;
