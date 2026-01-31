<template>
  <section class="py-20 bg-[#FFFDF7]">
    <div class="max-w-7xl mx-auto px-4">
      <!-- HEADER (CENTERED, DI ATAS) -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-4xl font-bold mb-4">
          Your Trusted Partner in
          <span class="text-green-500">Healthy Snacking</span>
        </h2>

        <p class="text-gray-500">
          At The Fruit Box, we believe in delivering more than just fruit we
          bring health, care, and consistency to your workspace. Every box is
          hand packed with farm fresh, chemical free produce, ready to energize
          your day.
        </p>
      </div>

      <!-- CONTENT -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- LEFT: FEATURES -->
        <div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="flex flex-col items-center justify-center gap-3 bg-white rounded-xl p-6 shadow-lg"
            >
              <div class="text-3xl mb-4">{{ feature.icon }}</div>
              <h4 class="font-semibold text-lg mb-2">{{ feature.title }}</h4>
              <p class="text-sm text-gray-500">
                {{ feature.description }}
              </p>
            </div>
          </div>

          <!-- CTA -->
          <div class="text-center mt-10">
            <button
              class="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition"
            >
              Learn More
              <span>➜</span>
            </button>
          </div>
        </div>

        <!-- RIGHT: IMAGES -->
        <div class="grid grid-cols-2 gap-4">
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            class="rounded-2xl object-cover w-full h-72"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: "🍎",
    title: "Tailored for Every Team",
    description:
      "We never stockpile. Your fruits are packed and shipped on the same day.",
  },
  {
    icon: "❄️",
    title: "Maximum Freshness",
    description:
      "We ensure farm fresh produce delivered directly to your office.",
  },
  {
    icon: "🚜",
    title: "From Farm to Office",
    description:
      "Direct sourcing from farms to ensure top quality and nutrition.",
  },
  {
    icon: "🌿",
    title: "Mess Free Packaging",
    description: "Eco-friendly packaging designed for clean and easy snacking.",
  },
];

const images = [
  "https://images.unsplash.com/photo-1540420773420-3366772f4999",
  "https://images.unsplash.com/photo-1542831371-d531d36971e6",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
];
</script>
