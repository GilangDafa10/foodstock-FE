<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <div>
    <Navbar />
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>
