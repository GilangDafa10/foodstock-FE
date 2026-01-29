<script setup>
import { reactive, ref, onMounted } from "vue";
import { X, Loader2 } from "lucide-vue-next";
import stockService from "@/services/stock.service";
import productService from "@/services/product.service";

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close", "success"]); // 'success' untuk trigger refresh di parent

const isSubmitting = ref(false);
const products = ref([]);

const form = reactive({
  product_id: "",
  type: "in", // in atau out
  quantity: 0,
  note: "",
});

const fetchProducts = async () => {
  try {
    const res = await productService.getAll();
    products.value = res.data.data || res.data;
  } catch (error) {
    console.error("Gagal load produk", error);
  }
};

const resetForm = () => {
  form.product_id = "";
  form.type = "in";
  form.quantity = 0;
  form.note = "";
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    await stockService.create(form);

    emit("success"); // Beri tahu parent untuk refresh tabel
    resetForm(); // Bersihkan form
    emit("close"); // Tutup modal
  } catch (error) {
    console.error(error);
    alert("Gagal membuat kategori");
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
  >
    <div
      class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
    >
      <div
        class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between"
      >
        <h3 class="font-semibold text-lg text-gray-800 dark:text-white">
          Kelola Stok Produk
        </h3>
        <button @click="$emit('close')">
          <X class="size-5 text-gray-400 cursor-pointer" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
            >Kategori <span class="text-red-500">*</span></label
          >
          <div class="relative">
            <select
              v-model="form.product_id"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all appearance-none bg-white"
            >
              <option value="" disabled>Pilih Product...</option>
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
            >Type</label
          >
          <select
            v-model="form.type"
            class="w-full px-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
          >
            <option value="" disabled>Pilih Type...</option>
            <option value="in">Masuk</option>
            <option value="out">Keluar</option>
          </select>
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
            >Jumlah <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.quantity"
            type="number"
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
          />
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
            >Catatan</label
          >
          <input
            v-model="form.note"
            type="text"
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
          />
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
          >
            <Loader2 v-if="isSubmitting" class="animate-spin size-4" /> Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
