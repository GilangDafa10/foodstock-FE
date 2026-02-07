// stores/cart.store.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: []
    }),

    getters: {
        totalItems: (state) =>
            state.items.reduce((sum, i) => sum + i.quantity, 0),

        totalPrice: (state) =>
            state.items.reduce((sum, i) => sum + (i.price * i.quantity), 0),
    },

    actions: {
        add(product, qty = 1) {
            const existing = this.items.find(
                (i) => i.product_id === product.id
            );

            if (existing) {
                existing.quantity += qty;
            } else {
                this.items.push({
                    product_id: product.id,
                    name: product.name,   // UI only
                    price: product.price, // UI only
                    unit: product.unit,
                    quantity: qty,
                });
            }
        },

        remove(productId) {
            this.items = this.items.filter(
                (i) => i.product_id !== productId
            );
        },

        clear() {
            this.items = [];
        }
    }
});
