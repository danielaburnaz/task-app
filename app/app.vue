<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <NuxtRouteAnnouncer />

    <nav class="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">Task Manager</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your tasks and requests</p>
          </div>
          <NuxtButton
            @click="toggleColorMode"
            :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            variant="ghost"
            size="lg"
            :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          />
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section class="mb-12">
        <h2 class="text-xl font-semibold mb-4">Tasks ({{ tasks.length }})</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TaskCard
            v-for="task in tasks"
            :key="task.id"
            :item="task"
          />
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-4">Requests ({{ requests.length }})</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TaskCard
            v-for="request in requests"
            :key="request.id"
            :item="request"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import TaskCard from '../components/TaskCard.vue'
import { useTasks } from '../composables/useTasks'

const { tasks, requests } = useTasks()
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
