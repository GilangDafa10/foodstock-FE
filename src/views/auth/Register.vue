<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import { Eye, EyeOff } from "lucide-vue-next";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "", // ✅ Ganti dari repeatPassword
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errorMessage = ref("");
const isSubmitting = ref(false);

const submit = async () => {
  errorMessage.value = "";

  // Validasi client-side
  if (form.password !== form.password_confirmation) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  if (form.password.length < 8) {
    errorMessage.value = "Password must be at least 8 characters";
    return;
  }

  isSubmitting.value = true;
  try {
    await auth.register(form);
    router.push("/auth/login");
  } catch (error) {
    // ✅ Handle error validasi Laravel
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;

      // Ambil pesan error pertama dari setiap field
      const errorMessages = Object.values(errors).flat();
      errorMessage.value = errorMessages[0] || "Validation failed";

      console.error("Validation errors:", errors);
    } else {
      errorMessage.value =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">
            Join us and start your journey today
          </p>
        </div>

        <form @submit.prevent="submit" class="space-y-5">
          <!-- Name Field -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Full Name
            </label>
            <input
              v-model="form.name"
              id="name"
              type="text"
              required
              class="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400 focus:border-lime-500 dark:focus:border-lime-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="John Doe"
            />
            <!-- ✅ Error untuk field name -->
            <p
              v-if="auth.getValidationError('name')"
              class="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {{ auth.getValidationError("name") }}
            </p>
          </div>

          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email address
            </label>
            <input
              v-model="form.email"
              id="email"
              type="email"
              required
              class="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400 focus:border-lime-500 dark:focus:border-lime-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="you@example.com"
            />
            <!-- ✅ Error untuk field email -->
            <p
              v-if="auth.getValidationError('email')"
              class="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {{ auth.getValidationError("email") }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                id="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400 focus:border-lime-500 dark:focus:border-lime-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <Eye v-if="!showPassword" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>
            <!-- ✅ Error untuk field password -->
            <p
              v-if="auth.getValidationError('password')"
              class="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {{ auth.getValidationError("password") }}
            </p>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label
              for="password_confirmation"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Confirm Password
            </label>
            <div class="relative">
              <input
                v-model="form.password_confirmation"
                id="password_confirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400 focus:border-lime-500 dark:focus:border-lime-400 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                :aria-label="
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                "
              >
                <Eye v-if="!showConfirmPassword" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>
            <!-- ✅ Error untuk field password_confirmation -->
            <p
              v-if="auth.getValidationError('password_confirmation')"
              class="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {{ auth.getValidationError("password_confirmation") }}
            </p>
          </div>

          <!-- ✅ Global Error Message -->
          <div
            v-if="errorMessage"
            class="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm"
          >
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="isSubmitting || auth.loading"
            class="w-full bg-lime-600 dark:bg-lime-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-lime-700 dark:hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting || auth.loading">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </span>
            <span v-else>Sign up</span>
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <router-link
            to="/auth/login"
            class="font-medium text-lime-600 dark:text-lime-400 hover:text-lime-500 dark:hover:text-lime-300"
          >
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
