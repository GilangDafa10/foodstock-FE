<script setup>
import { ref, onMounted } from "vue";
// import ProductService from "@/services/product.service";
import ProductStore from "@/stores/product.store";

const productStore = ProductStore();

onMounted(async () => {
  await productStore.fetchProduct();
  // try {
  //   const response = await ProductService.getAll();
  //   products.value = response.data || response.data.data;
  // } catch (error) {
  //   console.error("Error fetching products:", error);
  // }
});
</script>

<template>
  <div
    class="flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-22 py-20 bg-gray-100"
  >
    <h1 class="font-bold text-4xl mb-2">
      Pick the Perfect <span class="text-lime-600">Fresh Product</span>
    </h1>
    <p>
      Discover our range of fresh products, carefully selected to meet your
      needs and preferences.
    </p>
    <div class="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2">
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class="grid grid-cols-2 items-center overflow-hidden bg-white rounded-lg shadow-lg"
      >
        <div class="relative">
          <p
            class="absolute top-2 left-2 bg-green-600/80 text-white px-2 py-1 rounded text-sm font-bold"
          >
            {{ product.stock }} Stock
          </p>
          <img
            :src="product.image_url"
            :alt="product.name"
            class="object-cover w-full h-52"
          />
        </div>
        <div class="p-6 flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">
              {{ product.name }}
            </h2>
            <p class="mt-2 text-gray-600">{{ product.description }}</p>
            <p class="mt-2 text-lg font-bold text-green-600">
              Rp. {{ product.price }} /{{ product.unit }}
            </p>
          </div>

          <div class="mt-4">
            <a
              href="#"
              class="inline-block w-full text-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
