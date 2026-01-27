<script setup>
import Sidebar from "@/components/layout/Sidebar.vue";
</script>

<template>
  <Sidebar />
  <main class="flex-1">
    <slot />
  </main>
</template>
