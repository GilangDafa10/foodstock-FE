import { defineStore } from "pinia";
import ProductService from "@/services/product.service";

const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        loaded: false,
        fetching: false, // ← Flag untuk mencegah concurrent requests
    }),

    actions: {
        async fetchProduct(force = false) {
            // Jika sedang fetch atau sudah loaded dan tidak force
            if (this.fetching) return;
            if (this.loaded && !force) return;

            this.fetching = true;
            try {
                const res = await ProductService.getAll();
                this.products = res.data.data || res.data;
                this.loaded = true;
            } finally {
                this.fetching = false;
            }
        },
        async deleteProduct(id) {
            await ProductService.delete(id);
            this.products = this.products.filter((p) => p.id !== id);
        }
    }
})

export default useProductStore;