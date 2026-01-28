import api from "@/services/api";

const BASE_URL = "/products";
const BASE_URL_ADMIN = "/admin/products";

export default {
    getAll(params) {
        return api.get(BASE_URL, { params });
    },
    create(data) {
        return api.post(BASE_URL_ADMIN, data);
    },
    update(id, data) {
        return api.post(`${BASE_URL_ADMIN}/${id}`, data);
    },
    delete(id) {
        return api.delete(`${BASE_URL_ADMIN}/${id}`);
    }
}