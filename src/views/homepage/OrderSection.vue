<script setup>
import MakananMentah from "@/assets/makanan-mentah.jpg";
import MenerimaPaket from "@/assets/MenerimaPaket.jpeg";
import PilihJadwal from "@/assets/PilihJadwal.jpg";

const steps = [
  {
    id: 1,
    title: "Choose Your Box Size",
    description:
      "Pick from Small, Large, or customize your own box. Start with just 2 servings per person.",
    image: MakananMentah,
  },
  {
    id: 2,
    title: "Set Your Delivery Schedule",
    description:
      "Most customers choose weekly deliveries. But you can go daily, every 2 weeks, or monthly.",
    image: PilihJadwal,
  },
  {
    id: 3,
    title: "We Deliver to Your Address",
    description:
      "We carefully inspect, hand-pack, and deliver fresh fruit straight to your office.",
    image: MenerimaPaket,
  },
];
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <!-- Title -->
      <h2 class="text-4xl font-bold mb-4">
        How to Order Your <span class="text-lime-600">Fruit Box</span>
      </h2>
      <p class="text-gray-500 max-w-2xl mx-auto mb-16">
        Ordering is simple and flexible. Whether you're a small team or a large
        office, just follow these quick steps and get hand-packed, seasonal
        fruits delivered straight to your workspace.
      </p>

      <!-- Steps -->
      <div class="relative grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Step Card -->
        <div
          v-for="step in steps"
          :key="step.id"
          class="bg-gray-50 rounded-xl p-6 shadow-sm relative"
        >
          <!-- Number -->
          <div
            class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold absolute top-1 left-1/2 -translate-x-1/2"
          >
            {{ step.id }}
          </div>

          <!-- Image -->
          <img
            :src="step.image"
            :alt="step.title"
            class="rounded-lg mb-6 w-full h-48 object-cover"
          />

          <!-- Content -->
          <h3 class="font-semibold text-lg mb-2">{{ step.title }}</h3>
          <p class="text-gray-500 text-sm">{{ step.description }}</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16">
        <button
          class="cursor-pointer bg-green-600 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition"
        >
          Order Your Fruit Box
          <span class="text-lg">➜</span>
        </button>
      </div>
    </div>
  </section>
</template>
