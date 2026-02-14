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
    },
    cancelOrder(orderId) {
        return api.post(`/orders/${orderId}/cancel`)
    },
    createPayment(orderId) {
        return api.post('/payments', {
            order_id: orderId,
            payment_method: 'snap'
        })
    },
    retryPayment(orderId) {
        return api.post(`/payments/${orderId}/retry`)
    }
}