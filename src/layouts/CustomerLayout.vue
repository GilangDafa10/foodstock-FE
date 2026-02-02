<script setup>
import {
  User,
  ListOrdered,
  LogOut,
  ShoppingCart,
  MapPinned,
  Home,
} from "lucide-vue-next";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";

const auth = useAuthStore();

const menuItems = ref([
  { label: "My Profile", path: "/customer/profile", icon: User },
  { label: "My Addresses", path: "/customer/address", icon: MapPinned },
  { label: "My Orders", path: "/customer/orders", icon: ListOrdered },
  { label: "Buy Products", path: "/categories", icon: ShoppingCart },
]);

const logout = async () => {
  await auth.logout();
  localStorage.removeItem("token");
  window.location.href = "/auth/login";
};
</script>

<template>
  <section class="bg-gray-900 min-h-screen">
    <div class="flex gap-4 px-4 sm:px-6 lg:px-16 py-16">
      <aside class="w-80 bg-white rounded-lg shadow-lg p-6">
        <ul>
          <li v-for="item in menuItems" :key="item.label" class="mb-2">
            <router-link
              :to="item.path"
              active-class="bg-gray-800 text-white"
              class="flex items-start p-3 rounded-lg hover:bg-gray-800 hover:text-white w-full"
            >
              <span v-if="item.icon" class="inline-block mr-2">
                <component :is="item.icon" class="w-5 h-5" />
              </span>
              {{ item.label }}
            </router-link>
          </li>
        </ul>
        <div class="grid grid-cols-2 mt-4">
          <router-link
            to="/"
            class="flex p-3 rounded-lg hover:bg-gray-800 hover:text-white text-gray-600"
          >
            <Home class="w-5 h-5 inline-block mr-2" />Home
          </router-link>
          <button
            @click="logout"
            class="cursor-pointer w-full flex items-start p-3 rounded-lg hover:bg-gray-800 hover:text-white text-gray-600"
          >
            <LogOut class="w-5 h-5 inline-block mr-2" />
            Logout
          </button>
        </div>
      </aside>
      <main class="flex-1 bg-white rounded-lg shadow-lg p-6">
        <router-view />
      </main>
    </div>
  </section>
</template>
