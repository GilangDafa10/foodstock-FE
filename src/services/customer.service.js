import api from './api'

export default {
    getOrder() {
        return api.get('/orders')
    },
    getAddress() {
        return api.get('/addresses')
    }
}