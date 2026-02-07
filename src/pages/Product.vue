<!-- pages/ProductList.vue -->
<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useCartStore } from "@/stores/cart.store";
import useProductStore from "@/stores/product.store";

const cartStore = useCartStore();
const productStore = useProductStore();

// Computed untuk mengakses products dari store
const products = computed(() => productStore.products);
const loading = computed(() => productStore.fetching && !productStore.loaded);

// Refresh interval (setiap 30 detik)
const REFRESH_INTERVAL = 30000; // 30 detik
let refreshInterval = null;

const addToCart = (product) => {
  cartStore.add(product, 1);
  alert(`${product.name} ditambahkan ke keranjang`);
};

// Load products saat komponen mount
onMounted(() => {
  // Fetch initial data hanya jika belum loaded
  if (!productStore.loaded) {
    productStore.fetchProduct(true);
  }

  // Setup auto-refresh ke BE setiap 30 detik
  refreshInterval = setInterval(() => {
    productStore.fetchProduct(true); // force=true untuk selalu fetch dari BE
  }, REFRESH_INTERVAL);
});

// Cleanup interval saat komponen unmount
onBeforeUnmount(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});
</script>

<template>
  <div class="py-28 px-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Daftar Produk</h1>

    <div v-if="loading">Loading...</div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="border rounded-lg p-4 flex flex-col"
      >
        <img
          v-if="product.image_url"
          :src="product.image_url"
          class="h-40 object-cover rounded mb-3"
        />

        <h2 class="font-semibold text-lg">
          {{ product.name }}
        </h2>

        <p class="text-sm text-gray-500 mb-2">Stok: {{ product.stock }}</p>

        <p class="font-bold mb-4">Rp {{ product.price.toLocaleString() }}</p>

        <button
          class="cursor-pointer mt-auto bg-green-600 text-white py-2 rounded disabled:opacity-50"
          :disabled="product.stock === 0"
          @click="addToCart(product)"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  </div>
</template>
