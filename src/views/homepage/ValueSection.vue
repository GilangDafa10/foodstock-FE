<script setup>
import { Beef, ShieldPlus, Truck, FlaskConicalOff } from "lucide-vue-next";

const values = [
  {
    Icon: Beef,
    title: "Fresh Product",
    description: "We prioritize the quality and freshness of our products.",
  },
  {
    Icon: FlaskConicalOff,
    title: "Chemical Free",
    description: "We ensure all our products are free from harmful chemicals.",
  },
  {
    Icon: Truck,
    title: "Fast Delivery",
    description: "We ensure fast and reliable delivery of our products.",
  },
  {
    Icon: ShieldPlus,
    title: "Warranty",
    description: "We offer a warranty on all our products.",
  },
];
</script>

<template>
  <section class="grid grid-cols-4 px-4 sm:px-6 lg:px-22 py-16">
    <div
      v-for="(value, index) in values"
      :key="index"
      class="flex flex-col items-center p-6 text-center"
    >
      <component :is="value.Icon" class="mb-4 h-12 w-12 text-lime-600" />
      <h3 class="mb-2 text-xl font-semibold">{{ value.title }}</h3>
      <p class="text-gray-600">{{ value.description }}</p>
    </div>
  </section>
</template>
