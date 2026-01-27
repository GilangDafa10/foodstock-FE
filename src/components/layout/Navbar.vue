<script setup>
import { ref } from "vue";
import { ChefHat, User, LogOut } from "lucide-vue-next";
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
  <header class="fixed py-1 top-0 left-0 w-full z-50 bg-white shadow-md">
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8"
    >
      <a
        href="#"
        title=""
        class="flex items-center gap-1 text-xl text-white py-2 px-4 bg-gray-900 rounded-full"
      >
        <ChefHat class="size-6 text-lime-600 dark:text-lime-400" />
        <span class="font-semibold sm:block">Gilang</span>
        <span class="font-light sm:block">Foodstock</span>
      </a>

      <div class="hidden items-center md:block mr-20">
        <nav aria-label="Global" class="flex justify-center">
          <ul class="flex items-center justify-center gap-6 text-md">
            <li>
              <a
                class="font-medium text-md text-gray-900 transition hover:text-gray-600"
                href="#"
              >
                Home
              </a>
            </li>

            <li>
              <a
                class="font-medium text-md text-gray-900 transition hover:text-gray-600"
                href="#"
              >
                Our Products
              </a>
            </li>

            <li>
              <a
                class="font-medium text-md text-gray-900 transition hover:text-gray-600"
                href="#"
              >
                Why Us
              </a>
            </li>

            <li>
              <a
                class="font-medium text-md text-gray-900 transition hover:text-gray-600"
                href="#"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="flex items-center gap-4 relative">
        <!-- BELUM LOGIN -->
        <a v-if="!auth.isAuthenticated" href="/auth/login">
          <button
            class="cursor-pointer px-6 py-2 rounded-full border-2 border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white"
          >
            Sign In
          </button>
        </a>

        <!-- SUDAH LOGIN -->
        <div v-else class="relative">
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
            class="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border overflow-hidden"
          >
            <div class="px-4 py-3 text-sm text-gray-700 border-b">
              Hi,
              <span class="font-semibold">
                {{ auth.user?.name || "User" }}
              </span>
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

        <!-- MOBILE MENU -->
        <button
          class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span class="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
