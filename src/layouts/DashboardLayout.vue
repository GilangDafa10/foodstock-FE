<script setup>
import Sidebar from "@/components/layout/Sidebar.vue";
import Topbar from "@/components/layout/Topbar.vue";
</script>

<template>
  <section class="flex">
    <Sidebar />
    <main class="flex-1">
      <Topbar />
      <router-view />
    </main>
  </section>
</template>
