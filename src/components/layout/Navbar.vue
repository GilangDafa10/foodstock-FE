<script setup>
import { ChefHat } from "lucide-vue-next";
</script>

<template>
  <header class="fixed py-1 top-0 left-0 w-full z-50 bg-white shadow-md">
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8"
    >
      <a
        href="#"
        title=""
        class="flex items-center gap-1 text-xl text-white py-2 px-4 bg-gray-900 rounded-full"
      >
        <ChefHat class="size-6 text-lime-600 dark:text-lime-400" />
        <span class="font-semibold sm:block">Gilang</span>
        <span class="font-light sm:block">Foodstock</span>
      </a>

      <div class="hidden items-center md:block mr-20">
        <nav aria-label="Global" class="flex justify-center">
          <ul class="flex items-center justify-center gap-6 text-md">
            <li>
              <a
                class="font-medium text-md text-gray-900 transition hover:text-gray-600"
                href="#"
              >
                Home
              </a>
            </li>

            <li>
              <a
                class="font-medium text-md text-gray-900 transition hover:text-gray-600"
                href="#"
              >
                Our Products
              </a>
            </li>

            <li>
              <a
                class="font-medium text-md text-gray-900 transition hover:text-gray-600"
                href="#"
              >
                Why Us
              </a>
            </li>

            <li>
              <a
                class="font-medium text-md text-gray-900 transition hover:text-gray-600"
                href="#"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="flex items-center">
        <div class="flex items-center gap-4">
          <a href="/auth/login">
            <button
              class="cursor-pointer px-6 py-2 rounded-full border-2 border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white"
            >
              Sign In
            </button>
          </a>

          <button
            class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
          >
            <span class="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
