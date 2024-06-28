import axios, {AxiosInstance} from 'axios';
import { useCookies } from 'next-client-cookies';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8088/api',
})

/*
api.interceptors.request.use(
    (config) => {
        const cookies = useCookies();
        console.log(document.cookie)
        const token = cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
*/

export default api;