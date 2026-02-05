<script setup>
import { Loader2 } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import CustService from "@/services/customer.service";
import CreateModal from "./CreateModal.vue";
import EditModal from "./EditModal.vue";

const addresses = ref([]);
const loading = ref(true);

// state untuk modal
const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedAddress = ref(null);

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

const deleteAddress = async (addressId) => {
  if (!confirm("Yakin ingin menghapus alamat ini?")) return;
  try {
    await CustService.deleteAddress(addressId);
    addresses.value = addresses.value.filter(
      (address) => address.id !== addressId,
    );
  } catch (error) {
    console.error("Failed to delete address:", error);
  }
};

const openCreateModal = () => {
  showCreateModal.value = true;
};

const openEditModal = (address) => {
  selectedAddress.value = address;
  showEditModal.value = true;
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
        @click="openCreateModal"
        class="cursor-pointer px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
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
      Kamu belum memiliki alamat pengiriman.
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
            @click="openEditModal(address)"
            class="cursor-pointer bg-gray-900 px-3 py-1 rounded-lg text-white hover:bg-gray-800"
          >
            Edit
          </button>
          <button
            @click="deleteAddress(address.id)"
            class="cursor-pointer bg-red-600 px-3 py-1 rounded-lg text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Create Address Modal -->
    <CreateModal
      :show="showCreateModal"
      @close="showCreateModal = false"
      @success="fetchAddresses"
    />

    <EditModal
      :show="showEditModal"
      :address-data="selectedAddress"
      @close="showEditModal = false"
      @success="fetchAddresses"
    />
  </div>
</template>
