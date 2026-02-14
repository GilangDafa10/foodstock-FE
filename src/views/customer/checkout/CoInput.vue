<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useCheckoutStore } from "@/stores/checkout.store";
import { useCartStore } from "@/stores/cart.store";
import { useAuthStore } from "@/stores/auth.store";
import customerService from "@/services/customer.service";

const router = useRouter();
const checkoutStore = useCheckoutStore();
const cartStore = useCartStore();
const authStore = useAuthStore();

const savedAddresses = ref([]);
const selectedAddressId = ref(null);
const loading = ref(false);

const form = reactive({
  shipping_name: "",
  shipping_phone: "",
  shipping_address: "",
  city: "",
  postal_code: "",
});

// Load alamat tersimpan saat komponen mount
onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      loading.value = true;
      const response = await customerService.getAddress();
      savedAddresses.value = response.data || [];

      // Auto-populate dengan alamat pertama jika ada
      if (savedAddresses.value.length > 0) {
        selectAddress(savedAddresses.value[0]);
        selectedAddressId.value = savedAddresses.value[0].id;
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
    } finally {
      loading.value = false;
    }
  }
});

// Populate form ketika alamat dipilih
const selectAddress = (address) => {
  form.shipping_name = address.recipient_name || "";
  form.shipping_phone = address.phone || "";
  form.shipping_address = address.address || "";
  form.city = address.city || "";
  form.postal_code = address.postal_code || "";
};

const goToReview = () => {
  if (cartStore.items.length === 0) {
    alert("Keranjang kosong");
    return;
  }

  checkoutStore.setShipping(form);
  checkoutStore.setAddressId(selectedAddressId.value);

  router.push("/customer/checkout/review");
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Alamat Pengiriman</h1>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-500">
      Memuat alamat tersimpan...
    </div>

    <!-- Saved Addresses List -->
    <div v-else-if="savedAddresses.length > 0" class="mb-8">
      <h2 class="text-lg font-semibold mb-4">Pilih Alamat Tersimpan</h2>
      <div class="space-y-3">
        <div
          v-for="address in savedAddresses"
          :key="address.id"
          @click="
            selectAddress(address);
            selectedAddressId = address.id;
          "
          class="p-4 border rounded cursor-pointer transition hover:bg-gray-50"
          :class="{
            'border-green-600 bg-green-50': selectedAddressId === address.id,
          }"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="font-semibold">{{ address.label }}</div>
            <span
              v-if="address.is_default"
              class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
              >Default</span
            >
          </div>
          <div class="text-sm text-gray-700">
            {{ address.recipient_name }} • {{ address.phone }}
          </div>
          <div class="text-sm text-gray-500 mt-1">
            {{ address.address }}, {{ address.city }} {{ address.postal_code }}
          </div>
        </div>
      </div>
      <hr class="my-6" />
    </div>

    <!-- Form Input (untuk alamat baru atau edit) -->
    <h2 class="text-lg font-semibold mb-4">
      {{
        savedAddresses.length > 0
          ? "atau Gunakan Alamat Baru"
          : "Masukkan Alamat Pengiriman"
      }}
    </h2>

    <div class="grid grid-cols-1 gap-4">
      <input
        v-model="form.shipping_name"
        placeholder="Nama penerima"
        class="input"
      />
      <input v-model="form.shipping_phone" placeholder="No. HP" class="input" />
      <textarea
        v-model="form.shipping_address"
        placeholder="Alamat lengkap"
        class="input"
      />
      <input v-model="form.city" placeholder="Kota" class="input" />
      <input v-model="form.postal_code" placeholder="Kode pos" class="input" />
    </div>

    <button
      class="mt-6 bg-green-600 text-white px-6 py-3 rounded"
      @click="goToReview"
    >
      Lanjutkan
    </button>
  </div>
</template>
