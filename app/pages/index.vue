<template>
    <SearchFilter
      v-model:search-query="searchQuery"
      v-model:filters="filters"
    />

    <section class="mb-12 mt-8">
      <h2 class="text-xl font-semibold mb-4">
        Tasks ({{ filteredTasks.length }}{{ filteredTasks.length !== tasks.length ? ` of ${tasks.length}` : '' }})
      </h2>
      <div v-if="filteredTasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :item="task"
        />
      </div>
      <div v-else class="text-center py-12 opacity-60">
        No tasks found matching your filters
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-4">
        Requests ({{ filteredRequests.length }}{{ filteredRequests.length !== requests.length ? ` of ${requests.length}` : '' }})
      </h2>
      <div v-if="filteredRequests.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskCard
          v-for="request in filteredRequests"
          :key="request.id"
          :item="request"
        />
      </div>
      <div v-else class="text-center py-12 opacity-60">
        No requests found matching your filters
      </div>
    </section>
</template>

<script setup lang="ts">
import TaskCard from '../../components/TaskCard.vue'
import SearchFilter from '../../components/SearchFilter.vue'
import { useTasks } from '../../composables/useTasks'

const { tasks, requests, filteredTasks, filteredRequests, searchQuery, filters } = useTasks()
</script>
