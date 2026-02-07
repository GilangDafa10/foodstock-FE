<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart.store";
import { useCheckoutStore } from "@/stores/checkout.store";
import CustomerService from "@/services/customer.service";

const router = useRouter();
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();

const isSubmitting = ref(false);

const payload = computed(() => ({
  items: cartStore.items.map((i) => ({
    product_id: i.product_id,
    quantity: i.quantity,
  })),
  ...checkoutStore.shipping,
}));

const submitCheckout = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    const res = await CustomerService.checkOut(payload.value);
    console.log("PAYLOAD:", payload.value);

    cartStore.clear();
    checkoutStore.reset();
    const orderId = res.data.data?.id || res.data.id;

    router.push(`/checkout/success/${orderId}`);
  } catch (err) {
    alert(err.response?.data?.message || "Checkout gagal");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Konfirmasi Pesanan</h1>

    <!-- Items -->
    <div class="space-y-3 mb-6">
      <div
        v-for="item in cartStore.items"
        :key="item.product_id"
        class="flex justify-between border p-3 rounded"
      >
        <span>{{ item.name }} (x{{ item.quantity }})</span>
        <span> Rp {{ (item.price * item.quantity).toLocaleString() }} </span>
      </div>
    </div>

    <!-- Address -->
    <div class="border rounded p-4 mb-6">
      <h2 class="font-semibold mb-2">Alamat Pengiriman</h2>
      <p>{{ checkoutStore.shipping.shipping_name }}</p>
      <p>{{ checkoutStore.shipping.shipping_phone }}</p>
      <p>{{ checkoutStore.shipping.shipping_address }}</p>
      <p>
        {{ checkoutStore.shipping.city }},
        {{ checkoutStore.shipping.postal_code }}
      </p>
    </div>

    <!-- Total -->
    <div class="flex justify-between items-center">
      <strong>Total (estimasi)</strong>
      <strong> Rp {{ cartStore.totalPrice.toLocaleString() }} </strong>
    </div>

    <button
      class="mt-6 w-full bg-green-600 text-white py-3 rounded disabled:opacity-50"
      :disabled="isSubmitting"
      @click="submitCheckout"
    >
      Checkout Sekarang
    </button>
  </div>
</template>
