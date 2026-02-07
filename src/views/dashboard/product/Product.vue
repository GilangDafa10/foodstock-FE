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

// 👉 PINIA STORE
import ProductStore from "@/stores/product.store";

// Modals
import ProductCreateModal from "./CreateModal.vue";
import ProductEditModal from "./EditModal.vue";

// --- STORE ---
const productStore = ProductStore();

// --- LOCAL UI STATE ---
const isLoading = ref(false);
const searchQuery = ref("");

const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedProduct = ref(null);

// --- COMPUTED ---
const products = computed(() => productStore.products);

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
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
const fetchProducts = async (force = false) => {
  isLoading.value = true;
  try {
    await productStore.fetchProduct(force);
  } catch (error) {
    console.error("Gagal ambil data:", error);
  } finally {
    isLoading.value = false;
  }
};

const openCreate = () => {
  showCreateModal.value = true;
};

const openEdit = (product) => {
  selectedProduct.value = product;
  showEditModal.value = true;
};

const confirmDelete = async (id) => {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;
  try {
    await productStore.deleteProduct(id);
  } catch (error) {
    console.error("Error delete:", error);
    alert("Gagal menghapus produk.");
  }
};

// Callback sukses create / edit
const handleSuccess = async () => {
  await fetchProducts(true);
};

onMounted(fetchProducts);
</script>

<template>
  <div class="p-6">
    <div class="mb-5">
      <h1 class="text-2xl font-bold text-gray-800">Daftar Produk</h1>
      <p class="text-sm text-gray-500">Kelola produk dan harga anda</p>
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
              <th class="px-6 py-3">Nama Produk</th>
              <th class="px-6 py-3">Kategori</th>
              <th class="px-6 py-3">Harga</th>
              <th class="px-6 py-3">Stok</th>
              <th class="px-6 py-3">Satuan</th>
              <th class="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-if="isLoading">
              <td colspan="5" class="px-6 py-8 text-center">
                <Loader2 class="animate-spin size-6 mx-auto text-blue-500" />
              </td>
            </tr>

            <tr v-else-if="filteredProducts.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                Data produk tidak ditemukan.
              </td>
            </tr>

            <tr
              v-else
              v-for="product in filteredProducts"
              :key="product.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-10 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <img
                      v-if="product.image_url"
                      :src="product.image_url"
                      class="w-full h-full object-cover"
                    />
                    <Package v-else class="size-5" />
                  </div>
                  <div>
                    <div
                      class="font-medium text-gray-900 dark:text-white line-clamp-1"
                    >
                      {{ product.name }}
                    </div>
                    <div class="text-xs text-gray-400 truncate max-w-[200px]">
                      {{ product.description || "Tidak ada deskripsi" }}
                    </div>
                  </div>
                </div>
              </td>

              <td
                class="px-6 py-4 font-medium text-gray-700 dark:text-gray-300"
              >
                {{ product.category.name }}
              </td>

              <td
                class="px-6 py-4 font-medium text-gray-700 dark:text-gray-300"
              >
                {{ formatRupiah(product.price) }}
              </td>

              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    product.stock < 10
                      ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                  ]"
                >
                  {{ product.stock }}
                </span>
              </td>

              <td class="px-6 py-4">
                <span
                  class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs uppercase dark:bg-gray-800 dark:text-gray-300"
                >
                  {{ product.unit }}
                </span>
              </td>

              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button
                    @click="openEdit(product)"
                    class="p-2 hover:bg-blue-50 rounded-lg text-gray-500 hover:text-blue-600 transition-colors dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                    title="Edit"
                  >
                    <Pencil class="size-4" />
                  </button>
                  <button
                    @click="confirmDelete(product.id)"
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
        <span>Menampilkan {{ filteredProducts.length }} data</span>
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

    <ProductCreateModal
      :show="showCreateModal"
      @close="showCreateModal = false"
      @success="handleSuccess"
    />

    <ProductEditModal
      :show="showEditModal"
      :product-data="selectedProduct"
      @close="showEditModal = false"
      @success="handleSuccess"
    />
  </div>
</template>
