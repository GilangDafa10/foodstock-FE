<script setup>
import {
  ChefHat,
  LayoutDashboard,
  Utensils,
  Activity,
  ListOrdered,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth.store";
import { ref } from "vue"; // Import ref jika menu ingin dinamis (opsional)

const auth = useAuthStore();

// ---------------------------------------------
// 1. DAFTAR MENU DIATUR DI SINI
// ---------------------------------------------
const menuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Utensils },
  { label: "Categories", path: "/admin/categories", icon: ListOrdered },
  {
    label: "Stock Adjustments",
    path: "/",
    icon: Activity,
  },
  { label: "Order", path: "/", icon: ListOrdered },
];

const logout = async () => {
  await auth.logout();
  localStorage.removeItem("token");
  window.location.href = "/auth/login";
};
</script>

<template>
  <div
    class="flex h-screen w-64 flex-col justify-between border-e bg-white dark:border-gray-800 dark:bg-gray-900"
  >
    <div class="px-4 py-6">
      <span class="flex items-center gap-1 ml-4">
        <ChefHat class="size-6 text-gray-700 dark:text-gray-200" />
        <span
          class="text-lg tracking-wider font-medium text-gray-700 dark:text-gray-200"
        >
          Gilang<span class="font-extrabold">Foodstock</span>
        </span>
      </span>

      <ul class="mt-6 space-y-1">
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link
            :to="item.path"
            active-class="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <component
              :is="item.icon"
              class="size-5 inline-block me-3 opacity-75"
            />
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>

    <div
      class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2 dark:border-gray-800 dark:bg-gray-900"
    >
      <button
        @click="logout"
        type="button"
        class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span
          class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
        >
          Logout
        </span>
      </button>
    </div>
  </div>
</template>
