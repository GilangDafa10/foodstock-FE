<script setup>
import { reactive, ref } from "vue";
import { X, Loader2 } from "lucide-vue-next";
import customerService from "@/services/customer.service";

const props = defineProps({
  show: Boolean,
  orderId: {
    type: [Number, null],
    default: null,
  },
});

const emit = defineEmits(["close", "success"]); // 'success' untuk trigger refresh di parent

const isSubmitting = ref(false);

const handleClose = () => {
  emit("close");
};

const handleSubmit = async () => {
  if (!window.snap) {
    alert("Snap belum terload");
    return;
  }

  if (!props.orderId) {
    alert("Order ID tidak valid");
    return;
  }

  isSubmitting.value = true;

  try {
    let response = await customerService.createPayment(props.orderId);
    const snapToken = response.data.snap_token;

    showSnapPayment(snapToken);
  } catch (error) {
    console.error("Payment Error:", error.response || error);

    // Jika pembayaran sudah ada, coba gunakan ulang
    if (
      error.response?.status === 400 &&
      error.response?.data?.message?.includes("sudah dibuat")
    ) {
      console.log("Payment sudah ada, coba retry...");
      try {
        const retryResponse = await customerService.retryPayment(props.orderId);
        const snapToken = retryResponse.data.snap_token;
        showSnapPayment(snapToken);
        return;
      } catch (retryError) {
        console.error("Retry Error:", retryError);
        alert(
          "Gagal melanjutkan pembayaran: " +
            (retryError.response?.data?.message || retryError.message),
        );
      }
    } else if (error.response?.status === 404) {
      alert("Endpoint pembayaran tidak ditemukan (404)");
    } else if (error.response?.status === 400) {
      alert(
        "Pembayaran gagal: " +
          (error.response?.data?.message || "Data tidak valid"),
      );
    } else if (error.response?.status === 500) {
      alert(
        "Error server: " + (error.response?.data?.message || "Coba lagi nanti"),
      );
    } else {
      alert("Gagal membuat pembayaran: " + error.message);
    }
  } finally {
    isSubmitting.value = false;
  }
};

const showSnapPayment = (snapToken) => {
  window.snap.pay(snapToken, {
    onSuccess: function () {
      emit("success");
      emit("close");
    },
    onPending: function () {
      emit("success");
      emit("close");
    },
    onError: function () {
      alert("Pembayaran gagal");
    },
    onClose: function () {
      console.log("User menutup popup pembayaran");
    },
  });
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
  >
    <div
      class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
    >
      <!-- Header -->
      <div
        class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center"
      >
        <h3 class="font-semibold text-lg text-gray-800 dark:text-white">
          Metode Pembayaran
        </h3>
        <button
          @click="handleClose"
          class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <X class="size-5 text-gray-400 cursor-pointer" />
        </button>
      </div>

      <!-- Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Klik tombol di bawah untuk melanjutkan pembayaran menggunakan Midtrans
          Snap.
        </p>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            @click="handleClose"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            Batal
          </button>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg flex items-center gap-2 transition"
          >
            <Loader2 v-if="isSubmitting" class="animate-spin size-4" />
            Bayar Sekarang
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
