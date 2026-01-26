<script setup>
import { ChefHat, BadgeCheck } from "lucide-vue-next";
</script>

<template>
  <footer class="h-full bg-white dark:border-gray-800 dark:bg-gray-900">
    <section
      class="mx-auto grid grid-cols-7 max-w-7xl gap-4 py-10 sm:gap-8 px-4 sm:px-6 lg:px-8"
    >
      <div
        class="col-span-3 flex flex-col justify-between items-start pr-4 space-y-6 sm:pr-28"
      >
        <a
          href="#"
          title=""
          class="flex items-center gap-1 text-xl text-gray-700 dark:text-gray-200"
        >
          <ChefHat class="size-6 text-lime-600 dark:text-lime-400" />
          <span class="font-semibold sm:block">Gilang</span>
          <span class="font-light sm:block">Foodstock</span>
        </a>
        <p class="text-white">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
          error accusantium illum consectetur placeat tempora commodi labore
          voluptatibus, quasi ipsam!
        </p>
        <div class="flex justify-center items-center gap-4">
          <BadgeCheck class="size-8 text-lime-600" />
          <BadgeCheck class="size-8 text-lime-600" />
          <BadgeCheck class="size-8 text-lime-600" />
          <BadgeCheck class="size-8 text-lime-600" />
        </div>
        <p class="mt-3 text-center text-gray-400">
          © 2025 <a href="https://prebuiltui.com">PrebuiltUI</a>
        </p>
      </div>
      <div
        class="flex items-start justify-between col-span-4 gap-10 text-gray-400"
      >
        <div class="flex flex-col gap-2">
          <h1 class="text-white">Foodstock</h1>
          <a href="">Home</a>
          <a href="">Our Product</a>
          <a href="">Why Us</a>
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="text-white">Legal</h1>
          <a href="">Term and Condition</a>
          <a href="">Privacy Policy</a>
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="text-white">Contact</h1>
          <p>foodstockgilang@gmail.com</p>
          <p>Jln. Sukowati Ds. Dungus</p>
        </div>
      </div>
    </section>
  </footer>
</template>
