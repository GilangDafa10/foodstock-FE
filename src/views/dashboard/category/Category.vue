<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
  Package,
} from "lucide-vue-next";

// Import Service & Modals
import categoryService from "@/services/category.service";
import categoryCreateModal from "./CreateModal.vue";
import categoryEditModal from "./EditModal.vue";

// --- STATE ---
const category = ref([]);
const isLoading = ref(false);
const searchQuery = ref("");

// State Modal
const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedCategory = ref(null); // Menyimpan data kategori yang sedang diedit

// --- COMPUTED ---
const filteredCategory = computed(() => {
  if (!searchQuery.value) return category.value;
  return category.value.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

// --- HELPERS ---
const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(parseFloat(value));
};

// --- ACTIONS ---
const fetchCategory = async () => {
  isLoading.value = true;
  try {
    const res = await categoryService.getAll();
    // Sesuaikan dengan respon API (res.data atau res.data.data)
    category.value = res.data.data || res.data;
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

// Handle Open Edit Modal
const openEdit = (category) => {
  selectedCategory.value = category;
  showEditModal.value = true;
};

// Handle Delete
const confirmDelete = async (id) => {
  if (!confirm("Yakin ingin menghapus kategori ini?")) return;
  try {
    await categoryService.delete(id);
    category.value = category.value.filter((c) => c.id !== id);
  } catch (error) {
    console.error("Error delete:", error);
    alert("Gagal menghapus kategori.");
  }
};

// Callback saat Sukses Create/Edit
const handleSuccess = () => {
  fetchCategory(); // Refresh data tabel
};

onMounted(() => {
  fetchCategory();
});
</script>

<template>
  <div class="p-6">
    <div class="mb-5">
      <h1 class="text-2xl font-bold text-gray-800">Daftar Kategori</h1>
      <p class="text-sm text-gray-500">Kelola kategori produk anda</p>
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
            placeholder="Cari nama produk..."
            class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          />
        </div>
        <button
          @click="openCreate"
          class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <Plus class="size-4" />
          Tambah Produk
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
              <th class="px-6 py-3">Nama Kategori</th>
              <th class="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-if="isLoading">
              <td colspan="5" class="px-6 py-8 text-center">
                <Loader2 class="animate-spin size-6 mx-auto text-blue-500" />
              </td>
            </tr>

            <tr v-else-if="filteredCategory.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                Data produk tidak ditemukan.
              </td>
            </tr>

            <tr
              v-else
              v-for="category in filteredCategory"
              :key="category.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td
                class="px-6 py-4 font-medium text-gray-700 dark:text-gray-300"
              >
                {{ category.name }}
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button
                    @click="openEdit(category)"
                    class="p-2 hover:bg-blue-50 rounded-lg text-gray-500 hover:text-blue-600 transition-colors dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                    title="Edit"
                  >
                    <Pencil class="size-4" />
                  </button>
                  <button
                    @click="confirmDelete(category.id)"
                    class="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors dark:hover:bg-red-900/30 dark:hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 class="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="p-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 flex justify-between items-center"
      >
        <span>Menampilkan {{ filteredCategory.length }} data</span>
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

    <categoryCreateModal
      :show="showCreateModal"
      @close="showCreateModal = false"
      @success="handleSuccess"
    />

    <categoryEditModal
      :show="showEditModal"
      :category-data="selectedCategory"
      @close="showEditModal = false"
      @success="handleSuccess"
    />
  </div>
</template>
