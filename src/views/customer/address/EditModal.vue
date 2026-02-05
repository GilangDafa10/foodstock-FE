<script setup>
import { reactive, ref, watch } from "vue";
import { X, Loader2 } from "lucide-vue-next";
import CustomerService from "@/services/customer.service";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  addressData: Object,
});

const emit = defineEmits(["close", "success"]); // 'success' untuk trigger refresh di parent

const isSubmitting = ref(false);

const form = reactive({
  id: null,
  label: "",
  recipient_name: "",
  phone: "",
  address: "",
  city: "",
  postal_code: "",
  is_default: true,
});

watch(
  () => props.addressData,
  (newData) => {
    if (newData) {
      form.id = newData.id;
      form.label = newData.label;
      form.recipient_name = newData.recipient_name;
      form.phone = newData.phone;
      form.address = newData.address;
      form.city = newData.city;
      form.postal_code = newData.postal_code;
      form.is_default = newData.is_default;
    }
  },
  { immediate: true },
);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    await CustomerService.editAddress(form.id, form);

    emit("success"); // Beri tahu parent untuk refresh tabel
    emit("close"); // Tutup modal
  } catch (error) {
    console.error("Error response:", error.response?.data);
    alert(
      "Gagal membuat alamat: " +
        (error.response?.data?.message || error.message),
    );
  } finally {
    isSubmitting.value = false;
  }
};
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
          Tambah Alamat Baru
        </h3>
        <button @click="$emit('close')">
          <X class="size-5 text-gray-400 cursor-pointer" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm mb-2 text-white">Label Alamat</label>
            <input
              v-model="form.label"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm mb-2 text-white">Nama Penerima</label>
            <input
              v-model="form.recipient_name"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm mb-2 text-white">Alamat Penerima</label>
          <textarea
            v-model="form.address"
            type="text"
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm mb-2 text-white">Nama Kota / Kab</label>
            <input
              v-model="form.city"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm mb-2 text-white">Nomor Telepon</label>
            <input
              v-model="form.phone"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div class="flex gap-3">
          <div>
            <label class="block text-sm mb-2 text-white">Kode Pos</label>
            <input
              v-model="form.postal_code"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm mb-2 text-white">Alamat Utama</label>
            <label
              class="relative inline-flex mt-1 items-center cursor-pointer"
            >
              <input
                type="checkbox"
                class="sr-only peer"
                v-model="form.is_default"
              />
              <div
                class="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"
              ></div>
            </label>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            @click="emit('close')"
            class="cursor-pointer px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
          >
            <Loader2 v-if="isSubmitting" class="animate-spin size-4" /> Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
