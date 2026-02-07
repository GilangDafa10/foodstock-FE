// stores/checkout.store.js
import { defineStore } from "pinia";

export const useCheckoutStore = defineStore("checkout", {
    state: () => ({
        address_id: null,
        shipping: {
            shipping_name: "",
            shipping_phone: "",
            shipping_address: "",
            city: "",
            postal_code: "",
        },
    }),

    actions: {
        setAddressId(id) {
            this.address_id = id;
        },

        setShipping(data) {
            this.shipping = { ...data };
        },

        reset() {
            this.$reset();
        },
    },
});
