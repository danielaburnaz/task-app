<template>
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
</template>

<script setup lang="ts">
import TaskCard from '../../components/TaskCard.vue'
import { useTasks } from '../../composables/useTasks'

const { tasks, requests } = useTasks()

</script>
