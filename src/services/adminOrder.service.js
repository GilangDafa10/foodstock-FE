import api from './api';

const BASE_URL = '/admin/orders';

export default {
    getAll() {
        return api.get(`${BASE_URL}`);
    },
    getDetails(orderId) {
        return api.get(`${BASE_URL}/${orderId}`);
    }
}