<script setup>
import { ref } from "vue";
import { User, LogOut } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth.store";

const auth = useAuthStore();
const showDropdown = ref(false);

const logout = async () => {
  await auth.logout();

  // hapus token dari localStorage
  localStorage.removeItem("token");

  showDropdown.value = false;
  window.location.href = "/auth/login";
};
</script>

<template>
  <nav>
    <!-- SUDAH LOGIN -->
    <div
      class="relative bg-gray-900 flex justify-end items-center h-16 px-4 sm:px-6 lg:px-8"
    >
      <!-- ICON USER -->
      <button
        @click="showDropdown = !showDropdown"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <User class="size-5 text-gray-700" />
      </button>

      <!-- DROPDOWN -->
      <div
        v-if="showDropdown"
        class="absolute right-4 top-12 mt-2 w-44 bg-white rounded-xl shadow-lg border overflow-hidden"
      >
        <div class="px-4 py-3 text-sm text-gray-700 border-b">
          Hi,
          <span class="font-semibold">
            {{ auth.user?.name || "User" }}
          </span>
        </div>

        <div class="px-4 py-3 text-sm text-gray-700 border-b">
          <RouterLink to="/">Home</RouterLink>
        </div>

        <button
          @click="logout"
          class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          <LogOut class="size-4" />
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
