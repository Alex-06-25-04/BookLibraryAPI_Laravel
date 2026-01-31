import LoadingSpinner from '../components/LoadingSpinner.js';

const API = import.meta.env.VITE_API_URL;

export const fetchApi = async (endpoint, options = {}) => {
    LoadingSpinner.show();

    const url = `${API}${endpoint}`;

    const token = localStorage.getItem('auth_token');

    const config = {
        method: options.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : null)
        }
    }

    if (options.data && !['GET', 'HEAD'].includes(config.method)) {
        config.body = JSON.stringify(options.data);
    }

    try {
        const response = await fetch(url, config);
        if (response.status === 204) return null;

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            await response.text();
            throw new Error('Server ha inviato HTML invece di JSON: ');
        }

        const data = await response.json();

        LoadingSpinner.hide();

        return data;

    } catch (e) {
        LoadingSpinner.hide();
        if (e instanceof Error) console.error('API ERROR: ', e.message);
        throw e;
    }
}