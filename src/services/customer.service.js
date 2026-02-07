import api from './api'

export default {
    getOrder() {
        return api.get('/orders')
    },
    getAddress() {
        return api.get('/addresses')
    },
    createAddress(address) {
        return api.post('/addresses', address)
    },
    editAddress(addressId, address) {
        return api.put(`/addresses/${addressId}`, address)
    },
    deleteAddress(addressId) {
        return api.delete(`/addresses/${addressId}`)
    },
    checkOut(payload) {
        return api.post('/checkout', payload)
    }
}