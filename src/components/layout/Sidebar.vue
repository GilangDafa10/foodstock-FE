<script setup>
import { useAuthStore } from "@/stores/auth.store";

const auth = useAuthStore();
const logout = async () => {
  await auth.logout();

  // hapus token dari localStorage
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
        <svg
          class="size-7 text-gray-700 dark:text-gray-200 icon icon-tabler icons-tabler-outline icon-tabler-hexagon-letter-m"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033"
          />
          <path d="M9 16v-8l3 5l3 -5v8" />
        </svg>
        <span
          class="text-xl tracking-wider font-medium text-gray-700 dark:text-gray-200"
          >mulio<span class="font-extrabold">node</span></span
        >
      </span>

      <ul class="mt-6 space-y-1">
        <li>
          <a
            href="#"
            class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            General
          </a>
        </li>

        <li>
          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            Teams
          </a>
        </li>

        <li>
          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            Billing
          </a>
        </li>

        <li>
          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            Invoices
          </a>
        </li>

        <li>
          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            Account
          </a>
        </li>
      </ul>
    </div>

    <div
      class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2 dark:border-gray-800 dark:bg-gray-900"
    >
      <button
        @click="logout"
        type="submit"
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
