<script setup>
import { Loader2 } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import CustService from "@/services/customer.service";
import PaymentModal from "./PaymentModal.vue";
import { useAuthStore } from "@/stores/auth.store";

const isLoading = ref(false);
const orders = ref([]);
const showPaymentModal = ref(false);
const selectedOrderId = ref(null);

const openPaymentModal = (orderId) => {
  selectedOrderId.value = orderId;
  showPaymentModal.value = true;
};

const fetchOrders = async () => {
  isLoading.value = true;
  try {
    const res = await CustService.getOrder();
    orders.value = res.data.data || res.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  } finally {
    isLoading.value = false;
  }
};

const cancelOrder = async (orderId) => {
  try {
    if (!confirm("Yakin ingin cancel orderan ini?")) return;
    await CustService.cancelOrder(orderId);
    fetchOrders();
  } catch (error) {
    console.error("Failed to cancel order:", error);
  }
};

onMounted(() => {
  fetchOrders();
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

const statusClass = (status) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "pending":
      return "bg-gray-100 text-gray-600";
  }
};
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">My Orders</h1>
      <p class="text-sm text-gray-500 mt-1">
        View your order history and details
      </p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-10 text-gray-500">
      <Loader2 class="animate-spin size-6 mx-auto text-gray-800" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="orders.length === 0"
      class="text-center py-10 text-gray-500"
    >
      You have no orders yet.
    </div>

    <!-- Orders -->
    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="border rounded-xl p-6 bg-gray-50"
      >
        <!-- Order Header -->
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between mb-4"
        >
          <div>
            <p class="font-semibold text-gray-800">Order #{{ order.id }}</p>
            <p class="text-sm text-gray-500">
              {{ formatDate(order.order_date) }}
            </p>
          </div>

          <span
            class="mt-2 md:mt-0 inline-block px-3 py-1 text-xs font-medium rounded-full"
            :class="statusClass(order.status)"
          >
            {{ order.status }}
          </span>
        </div>

        <!-- Products -->
        <div class="divide-y">
          <div
            v-for="item in order.order_details"
            :key="item.id"
            class="flex items-center gap-4 py-4"
          >
            <img
              :src="item.product.image_url"
              alt="product"
              class="w-16 h-16 rounded-lg object-cover"
            />

            <div class="flex-1">
              <p class="font-medium text-gray-800">
                {{ item.product.name }}
              </p>
              <p class="text-sm text-gray-500">
                {{ item.quantity }} {{ item.product.unit }} ×
                {{ formatCurrency(item.price) }}
              </p>
            </div>

            <div class="font-semibold text-gray-800">
              {{ formatCurrency(item.quantity * Number(item.price)) }}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between mt-4 pt-4"
        >
          <div class="text-sm text-gray-500">
            Ship to: {{ order.shipping_address }}, {{ order.city }}
          </div>
          <div class="text-lg font-semibold text-gray-800 mt-2 md:mt-0">
            Total: {{ formatCurrency(order.total_price) }}
          </div>
        </div>

        <!-- Button Action -->
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-end mt-4 pt-4 border-t"
        >
          <div class="flex justify-center items-center gap-3">
            <button
              @click="openPaymentModal(order.id)"
              :disabled="
                order.status === 'cancelled' || order.status === 'paid'
              "
              :class="
                order.status === 'cancelled' || order.status === 'paid'
                  ? 'cursor-not-allowed opacity-50 bg-gray-400'
                  : 'cursor-pointer bg-amber-500 hover:bg-amber-600'
              "
              class="text-white px-4 py-1 rounded-xl transition"
            >
              {{
                order.payment && order.payment.status === "pending"
                  ? "Lanjutkan Pembayaran"
                  : "Bayar"
              }}
            </button>
            <button
              @click="cancelOrder(order.id)"
              :disabled="order.status === 'cancelled'"
              :class="
                order.status === 'cancelled'
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              "
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-xl transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <PaymentModal
    :show="showPaymentModal"
    :orderId="selectedOrderId"
    @close="showPaymentModal = false"
    @success="fetchOrders"
  />
</template>
