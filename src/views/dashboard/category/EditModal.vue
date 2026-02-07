<script setup>
import { reactive, ref, watch } from "vue";
import { X, Loader2 } from "lucide-vue-next";
import categoryService from "@/services/category.service";

const props = defineProps({
  show: Boolean,
  categoryData: Object, // Wajib ada untuk mode edit
});

const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const initialForm = ref(null);

const form = reactive({
  id: null,
  name: "",
});

// Watcher: Jika categoryData berubah (saat modal dibuka), isi form
watch(
  () => props.categoryData,
  (newData) => {
    if (newData && props.show) {
      const data = {
        id: newData.id,
        name: newData.name,
      };

      // isi Form
      Object.assign(form, data);

      // simpan Snapshot
      initialForm.value = { ...data };
    }
  },
  { immediate: true },
);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    await categoryService.update(form.id, form);
    emit("success");
    emit("close");
  } catch (error) {
    console.error(error);
    alert("Gagal mengupdate kategori");
  } finally {
    isSubmitting.value = false;
  }
};

watch(
  () => props.show,
  (isOpen) => {
    if (!isOpen && initialForm.value) {
      Object.assign(form, initialForm.value);
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
      class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
    >
      <div
        class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between"
      >
        <h3 class="font-semibold text-lg text-gray-800 dark:text-white">
          Edit Kategori
        </h3>
        <button @click="$emit('close')">
          <X class="size-5 text-gray-400" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-sm mb-1">Nama Produk</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
            Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
