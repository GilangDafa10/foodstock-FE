<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { computed, ref } from "vue";

const auth = useAuthStore();

const user = computed(() => {
  return auth.user;
});
</script>

<template>
  <div>
    <!-- Title -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">My Profile</h1>
      <p class="text-sm text-gray-500 mt-1">Manage your personal information</p>
    </div>

    <!-- Profile Card -->
    <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div class="flex items-center gap-6 mb-6">
        <!-- Avatar -->
        <div
          class="w-20 h-20 rounded-full bg-gray-800 text-white flex items-center justify-center text-2xl font-semibold"
        >
          {{ user?.name?.charAt(0) }}
        </div>

        <!-- Basic Info -->
        <div>
          <h2 class="text-lg font-semibold text-gray-800">
            {{ user?.name }}
          </h2>
          <p class="text-sm text-gray-500">
            {{ user?.email }}
          </p>
          <span
            class="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700"
          >
            Customer
          </span>
        </div>
      </div>

      <!-- Detail Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-sm text-gray-500">Full Name</label>
          <div class="mt-1 p-3 bg-white border rounded-lg">
            {{ user?.name }}
          </div>
        </div>

        <div>
          <label class="text-sm text-gray-500">Email Address</label>
          <div class="mt-1 p-3 bg-white border rounded-lg">
            {{ user?.email }}
          </div>
        </div>

        <div>
          <label class="text-sm text-gray-500">Account Created</label>
          <div class="mt-1 p-3 bg-white border rounded-lg">
            {{ new Date(user?.created_at).toLocaleDateString() }}
          </div>
        </div>

        <div>
          <label class="text-sm text-gray-500">Role</label>
          <div class="mt-1 p-3 bg-white border rounded-lg">Customer</div>
        </div>
      </div>

      <!-- Action -->
      <div class="mt-6 flex justify-end">
        <button
          class="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
        >
          Edit Profile
        </button>
      </div>
    </div>
  </div>
</template>
