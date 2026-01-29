<script setup>
import { ref, computed, onMounted } from "vue";
import { Diff, Search, Loader2 } from "lucide-vue-next";

// Import Service & Modals
import stockService from "@/services/stock.service";
import stockCreateModal from "./CreateModal.vue";

// --- STATE ---
const stock = ref([]);
const isLoading = ref(false);
const searchQuery = ref("");

// State Modal
const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedStock = ref(null); // Menyimpan data stock yang sedang diedit

// --- COMPUTED ---
const filteredStock = computed(() => {
  if (!searchQuery.value) return stock.value;
  return stock.value.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

// --- ACTIONS ---
const fetchStock = async () => {
  isLoading.value = true;
  try {
    const res = await stockService.getAll();
    // Sesuaikan dengan respon API (res.data atau res.data.data)
    stock.value = res.data.data || res.data;
  } catch (error) {
    console.error("Gagal ambil data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Handle Open Create Modal
const openCreate = () => {
  showCreateModal.value = true;
};

// Callback saat Sukses Create/Edit
const handleSuccess = () => {
  fetchStock(); // Refresh data tabel
};

onMounted(() => {
  fetchStock();
});
</script>

<template>
  <div class="p-6">
    <div class="mb-5">
      <h1 class="text-2xl font-bold text-gray-800">Daftar Histori Stock</h1>
      <p class="text-sm text-gray-500">Kelola histori stock produk anda</p>
    </div>

    <div
      class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
    >
      <div
        class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800"
      >
        <div class="relative max-w-sm">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari riwayat stok......"
            class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          />
        </div>
        <button
          @click="openCreate"
          class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <Diff class="size-4" />
          Kelola Stock
        </button>
      </div>

      <div class="overflow-x-auto">
        <table
          class="w-full text-left text-sm text-gray-600 dark:text-gray-400"
        >
          <thead
            class="bg-gray-50 dark:bg-gray-800 text-xs uppercase font-medium"
          >
            <tr>
              <th class="px-6 py-3">Nama Produk</th>
              <th class="px-6 py-3">Type</th>
              <th class="px-6 py-3">Jumlah</th>
              <th class="px-6 py-3">Catatan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-if="isLoading">
              <td colspan="5" class="px-6 py-8 text-center">
                <Loader2 class="animate-spin size-6 mx-auto text-blue-500" />
              </td>
            </tr>

            <tr v-else-if="filteredStock.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                Data produk tidak ditemukan.
              </td>
            </tr>

            <tr
              v-else
              v-for="stock in filteredStock"
              :key="stock.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td
                class="px-6 py-4 font-medium text-gray-700 dark:text-gray-300"
              >
                {{ stock.product.name }}
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    stock.type === 'out'
                      ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                  ]"
                >
                  {{ stock.type }}
                </span>
              </td>
              <td
                class="px-6 py-4 font-medium text-gray-700 dark:text-gray-300"
              >
                {{ stock.quantity }}
              </td>
              <td
                class="px-6 py-4 font-medium text-gray-700 dark:text-gray-300"
              >
                {{ stock.note }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="p-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 flex justify-between items-center"
      >
        <span>Menampilkan {{ filteredStock.length }} data</span>
        <div class="flex gap-2">
          <button
            class="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
            disabled
          >
            Previous
          </button>
          <button
            class="px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <stockCreateModal
      :show="showCreateModal"
      @close="showCreateModal = false"
      @success="handleSuccess"
    />
  </div>
</template>
