import { fetchApi } from './fetchApi.js';

export default class ReadingListApi {
    getFavoriteList = async () => {
        return await fetchApi('/reading-list')
    }

    toggle = async (bookId) => {
        return await fetchApi(`/reading-list/toggle`, {
            method: 'POST',
            data: { book_id: bookId }
        });
    }

    check = async (bookId) => {
        return await fetchApi(`/reading-list/${bookId}`);
    }

    destroy = async (bookId) => {
        return await fetchApi(`/reading-list/${bookId}`, {
            method: 'DELETE'
        });
    }
}