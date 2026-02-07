<script setup>
import { reactive, ref, watch } from "vue";
import { X, Loader2, UploadCloud, Trash2 } from "lucide-vue-next";
import productService from "@/services/product.service";
import api from "@/services/api";

const props = defineProps({
  show: Boolean,
  productData: Object, // Menerima data produk yang akan diedit
});

const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const categories = ref([]);
const initialForm = ref(null);

// State khusus untuk File
const selectedFile = ref(null);
const previewUrl = ref(null);

// Form Data
const form = reactive({
  name: "",
  category_id: "",
  price: "",
  unit: "kg",
  description: "",
});

// Fetch Kategori
const fetchCategories = async () => {
  try {
    const res = await api.get("/admin/categories"); // Sesuaikan endpoint
    categories.value = res.data.data || res.data;
  } catch (error) {
    console.error("Gagal load kategori", error);
  }
};

// --- LOGIKA UTAMA EDIT: Isi Form saat prop product berubah ---
watch(
  () => props.productData,
  (newProduct) => {
    if (newProduct && props.show) {
      const data = {
        name: newProduct.name,
        category_id: newProduct.category_id,
        price: newProduct.price,
        unit: newProduct.unit,
        description: newProduct.description,
      };

      // 1️⃣ isi form
      Object.assign(form, data);

      // 2️⃣ simpan snapshot (deep clone)
      initialForm.value = JSON.parse(JSON.stringify(data));

      // 3️⃣ reset file
      selectedFile.value = null;

      // 4️⃣ preview image
      if (newProduct.image_url) {
        previewUrl.value = newProduct.image_url.startsWith("http")
          ? newProduct.image_url
          : `http://localhost:8000/storage/${newProduct.image_url.replace(/^\/?storage\//, "")}`;
      } else {
        previewUrl.value = null;
      }
    }
  },
  { immediate: true },
);

// Handle saat user memilih file BARU
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    // Ganti preview dengan file lokal baru
    previewUrl.value = URL.createObjectURL(file);
  }
};

// Hapus file (Hanya menghapus dari preview/input, tidak langsung hapus di DB)
const removeFile = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  const input = document.getElementById("file-upload");
  if (input) input.value = "";
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    const formData = new FormData();

    // ⚠️ PENTING UNTUK LARAVEL UPDATE DENGAN FILE:
    // Gunakan Method Spoofing agar terbaca sebagai PUT meski dikirim via POST
    formData.append("_method", "PUT");

    formData.append("name", form.name);
    formData.append("category_id", form.category_id);
    formData.append("price", form.price);
    formData.append("unit", form.unit);
    formData.append("description", form.description || ""); // Handle null description

    // Hanya kirim key 'image' jika user memilih file baru
    if (selectedFile.value) {
      formData.append("image", selectedFile.value);
    }

    // Panggil service update (pastikan service menerima ID)
    await productService.update(props.productData.id, formData);

    emit("success");
    emit("close");
    // Tidak perlu resetForm() manual karena akan di-handle watcher saat dibuka lagi
  } catch (error) {
    console.error(error);
    const msg = error.response?.data?.message || "Gagal mengupdate produk";
    alert(msg);
  } finally {
    isSubmitting.value = false;
  }
};

watch(
  () => props.show,
  (isOpen) => {
    if (!isOpen && initialForm.value) {
      // Restore form
      Object.assign(form, initialForm.value);
      fetchCategories();

      // Reset file & preview
      selectedFile.value = null;
      previewUrl.value = props.productData?.image_url
        ? props.productData.image_url.startsWith("http")
          ? props.productData.image_url
          : `http://localhost:8000/storage/${props.productData.image_url.replace(/^\/?storage\//, "")}`
        : null;
    }
  },
);
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
  >
    <div
      class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
    >
      <div
        class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between sticky top-0 bg-white dark:bg-gray-900 z-10"
      >
        <h3 class="font-semibold text-lg text-gray-800 dark:text-white">
          Edit Produk
        </h3>
        <button @click="$emit('close')">
          <X class="size-5 text-gray-400 cursor-pointer hover:text-gray-600" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
            >Nama Produk <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
          />
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
            >Kategori <span class="text-red-500">*</span></label
          >
          <div class="relative">
            <select
              v-model="form.category_id"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all appearance-none bg-white"
            >
              <option value="" disabled>Pilih Kategori...</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
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

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
              >Harga <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.price"
              type="number"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
            />
          </div>
          <div>
            <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
              >Satuan</label
            >
            <select
              v-model="form.unit"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
            >
              <option value="kg">Kilogram (kg)</option>
              <option value="gr">Gram (gr)</option>
              <option value="pcs">Pcs / Buah</option>
              <option value="pack">Pack / Bungkus</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
            >Gambar Produk</label
          >

          <div v-if="!previewUrl" class="relative group">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              @change="handleFileChange"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              class="flex items-center justify-center gap-2 w-full px-4 py-3 border border-dashed border-gray-300 rounded-lg text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:border-gray-700"
            >
              <UploadCloud class="size-4" />
              <span class="text-xs">Upload Gambar Baru</span>
            </div>
          </div>

          <div v-else class="relative w-full h-32 group">
            <img
              :src="previewUrl"
              class="w-full h-full object-cover rounded-lg border border-gray-200"
            />

            <button
              type="button"
              @click="removeFile"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-transform hover:scale-110"
              title="Ganti Gambar"
            >
              <Trash2 class="size-3" />
            </button>

            <div
              v-if="selectedFile"
              class="absolute bottom-2 right-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow"
            >
              File Baru
            </div>
          </div>
          <p
            class="text-xs text-gray-400 mt-1"
            v-if="!selectedFile && previewUrl"
          >
            *Gambar saat ini. Klik ikon sampah untuk mengganti.
          </p>
        </div>

        <div>
          <label class="block text-sm mb-1 text-gray-700 dark:text-gray-300"
            >Deskripsi</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
          ></textarea>
        </div>

        <div
          class="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800"
        >
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          >
            Batal
          </button>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 transition-colors"
          >
            <Loader2 v-if="isSubmitting" class="animate-spin size-4" />
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
