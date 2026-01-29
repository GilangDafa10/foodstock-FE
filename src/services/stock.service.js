import api from "./api";

const BASE_URL = '/admin/stock';

export default {
    getAll() {
        return api.get(`${BASE_URL}/history`);
    },
    create(data) {
        return api.post(`${BASE_URL}/adjust`, data);
    }
}