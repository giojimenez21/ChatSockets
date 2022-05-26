import { types } from "../types/types";

const URLBackend = import.meta.env.VITE_URL_BACKEND;

export const startLogin = async (tokenGoogle) => {
    try {
        const res = await fetch(`${URLBackend}/auth/newUserOrLogin`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(tokenGoogle)
        });
        
        if (res.ok) {
            const data = await res.json();
            return data;
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const login = (user) => ({
    type: types.login,
    payload: user
});

export const startChecking = async () => {
    try {
        const token = localStorage.getItem('token') || '';
        const res = await fetch(`${URLBackend}/auth/renew`, {
            method: "GET",
            headers: {
                'x-token': token
            }
        });
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('token', data.token);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const logout = () => ({
    type: types.logout
});