<script setup>
import HomeLayout from "@/layouts/HomeLayout.vue";
import HeroSection from "@/views/homepage/HeroSection.vue";
import ProductSection from "@/views/homepage/ProductSection.vue";
import ValueSection from "@/views/homepage/ValueSection.vue";
import OrderSection from "@/views/homepage/OrderSection.vue";
import TrustedSection from "@/views/homepage/TrustedSection.vue";
</script>

<template>
  <HomeLayout>
    <HeroSection />
    <ProductSection />
    <ValueSection />
    <OrderSection />
    <TrustedSection />
  </HomeLayout>
</template>
