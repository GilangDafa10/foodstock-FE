<script setup>
import { Loader2 } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import CustService from "@/services/customer.service";

const addresses = ref([]);
const loading = ref(true);

const fetchAddresses = async () => {
  loading.value = true;
  try {
    const res = await CustService.getAddress();
    addresses.value = res.data.data || res.data;
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAddresses();
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">My Addresses</h1>
        <p class="text-sm text-gray-500 mt-1">Manage your shipping addresses</p>
      </div>

      <button
        class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
      >
        + Add Address
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-10 text-gray-500">
      <Loader2 class="animate-spin size-6 mx-auto text-gray-800" />
    </div>

    <!-- Empty -->
    <div
      v-else-if="addresses.length === 0"
      class="py-10 text-center text-gray-500"
    >
      You have no saved addresses.
    </div>

    <!-- Address List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="address in addresses"
        :key="address.id"
        class="border rounded-xl p-5 bg-gray-50 relative"
      >
        <!-- Default Badge -->
        <span
          v-if="address.is_default"
          class="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700"
        >
          Default
        </span>

        <h3 class="font-semibold text-gray-800 mb-1">
          {{ address.label }}
        </h3>

        <p class="text-sm text-gray-700">
          {{ address.recipient_name }} • {{ address.phone }}
        </p>

        <p class="text-sm text-gray-500 mt-2">
          {{ address.address }}, {{ address.city }} {{ address.postal_code }}
        </p>

        <!-- Actions -->
        <div class="mt-4 flex gap-3 text-sm">
          <button
            class="cursor-pointer bg-gray-900 px-3 py-1 rounded-lg text-white hover:bg-gray-800"
          >
            Edit
          </button>
          <button
            class="cursor-pointer bg-red-600 px-3 py-1 rounded-lg text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
