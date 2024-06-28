import api from "@/app/api/index";
import { cookies } from "next/headers";


export type LoginForm = {
    email: string,
    password: string,
}


export const login = async ({email, password}: LoginForm) => {
    try {
        const response = await api.post('/auth/login', {
            headers: {
                email: email,
                password: password,
            }
        });
        const token = response.headers['authorization'] || response.headers['Authorization'];

        if (token) {
            const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
            const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);
            cookies().set('token', tokenValue, { expires:  expirationTime});
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}


export type RegisterForm = {
    name: string,
    role?: string | null
}

const defaultRegisterForm = {
    name: "",
    role: "STUDENT",
}


export const register = async (registerForm: Partial<RegisterForm>, email: string, password: string) => api.post('/auth/login', {
    headers: {
        email: email,
        password: password,
    },
    body: {
        ...defaultRegisterForm,
        ...registerForm
    },
})