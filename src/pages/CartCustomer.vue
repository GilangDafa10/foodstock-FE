<script setup>
import { useCartStore } from "@/stores/cart.store";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();

const increaseQty = (item) => {
  item.quantity++;
};

const decreaseQty = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const removeItem = (id) => {
  cartStore.remove(id);
};

const goToCheckout = () => {
  if (cartStore.items.length === 0) return;
  router.push("/customer/checkout");
};
</script>

<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Keranjang Belanja</h1>

    <!-- Empty State -->
    <div
      v-if="cartStore.items.length === 0"
      class="text-center text-gray-500 py-20"
    >
      Keranjang masih kosong
    </div>

    <!-- Cart Items -->
    <div v-else class="space-y-4">
      <div
        v-for="item in cartStore.items"
        :key="item.product_id"
        class="grid grid-cols-4 gap-4 items-center border rounded p-4"
      >
        <!-- Info -->
        <div>
          <h2 class="font-semibold">
            {{ item.name }}
          </h2>
          <p class="text-sm text-gray-500">
            Rp {{ item.price.toLocaleString() }} / {{ item.unit }}
          </p>
        </div>

        <!-- Quantity -->
        <div class="flex items-center gap-3">
          <button class="px-3 py-1 border rounded" @click="decreaseQty(item)">
            -
          </button>

          <span>{{ item.quantity }}</span>

          <button class="px-3 py-1 border rounded" @click="increaseQty(item)">
            +
          </button>
        </div>

        <!-- Subtotal -->
        <div class="font-semibold">
          Rp {{ (item.price * item.quantity).toLocaleString() }}
        </div>

        <!-- Remove -->
        <div class="flex justify-center">
          <button
            class="cursor-pointer bg-red-500 text-sm px-3 py-1 text-white rounded-lg"
            @click="removeItem(item.product_id)"
          >
            Hapus
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div class="flex justify-between items-center border-t pt-6">
        <div class="text-lg font-semibold">
          Total (estimasi): Rp {{ cartStore.totalPrice.toLocaleString() }}
        </div>

        <button
          class="bg-green-600 text-white px-6 py-3 rounded disabled:opacity-50"
          :disabled="cartStore.items.length === 0"
          @click="goToCheckout"
        >
          Lanjut ke Checkout
        </button>
      </div>
    </div>
  </div>
</template>
