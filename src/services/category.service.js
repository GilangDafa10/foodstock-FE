import api from './api';

const BASE_URL = '/admin/categories';

export default {
    getAll() {
        return api.get(BASE_URL);
    },
    create(data) {
        return api.post(BASE_URL, data);
    },
    update(id, data) {
        return api.put(`${BASE_URL}/${id}`, data);
    },
    delete(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}