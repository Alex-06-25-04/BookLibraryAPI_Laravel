import { fetchApi } from './fetchApi.js';

export default class AuthApi {
    register = async (data) => {
        return await fetchApi('/register', {
            method: 'POST',
            data: data
        });
    }

    login = async (data) => {
        const auth = await fetchApi('/login', {
            method: 'POST',
            data: data
        });

        const { token, user } = auth;

        console.log('LOGIN RESPONSE:', auth);

        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return auth;
    }

    logout = async () => {
        await fetchApi('/logout', {
            method: 'POST'
        });

        localStorage.clear(); // Pulisci tutto
        window.location.href = '/auth'; // Hard redirect
    }
}