<template>
  <div>
    <NuxtRouteAnnouncer />

    <nav
      class="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">Task Manager</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your tasks and requests
            </p>
          </div>
          <NuxtButton
            @click="toggleColorMode"
            :icon="
              colorMode.value === 'dark'
                ? 'i-heroicons-sun'
                : 'i-heroicons-moon'
            "
            variant="ghost"
            size="lg"
            :aria-label="
              colorMode.value === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            "
          />
        </div>
      </div>
    </nav>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  const colorMode = useColorMode();

  const toggleColorMode = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };
</script>
