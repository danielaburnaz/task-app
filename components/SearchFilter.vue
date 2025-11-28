<template>
    <div class="w-full bg-white dark:bg-gray-900 p-4 mb-4">
      <div class="relative">
        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <NuxtInput
          v-model="localSearchQuery"
          placeholder="Search tasks and requests..."
          class="pl-10 w-full"
          @update:model-value="updateSearch"
        />
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 p-4">
      <div class="flex flex-col justify-between sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span class="font-medium text-sm text-gray-700 dark:text-gray-300">Filters</span>
          <span v-if="activeFilterCount > 0" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
            {{ activeFilterCount }}
          </span>
        </div>

        <div class="flex flex-wrap gap-3 items-center">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <NuxtSelect
              v-model="localFilters.priority"
              :items="priorityOptions"
              placeholder="Priority"
              multiple
              class="min-w-[140px]"
            />
          </div>

          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <NuxtSelect
              v-model="localFilters.status"
              :items="statusOptions"
              placeholder="Status"
              multiple
              class="min-w-[140px]"
            />
          </div>

          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <NuxtSelect
              v-model="localFilters.reward"
              :items="rewardOptions"
              placeholder="Reward"
              multiple
              class="min-w-[140px]"
            />
          </div>

          <NuxtButton
            v-if="hasActiveFilters"
            color="neutral"
            variant="soft"
            size="sm"
            @click="clearFilters"
          >
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All
          </NuxtButton>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import type { Priority, Reward } from '../types/index'

export interface Filters {
  priority: Priority[]
  status: string[]
  reward: Reward[]
}

interface Props {
  searchQuery?: string
  filters?: Filters
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'update:filters', value: Filters): void
}

const props = withDefaults(defineProps<Props>(), {
  searchQuery: '',
  filters: () => ({
    priority: [],
    status: [],
    reward: []
  })
})

const emit = defineEmits<Emits>()

const localSearchQuery = ref(props.searchQuery)
const localFilters = ref<Filters>({
  priority: props.filters.priority || [],
  status: props.filters.status || [],
  reward: props.filters.reward || []
})

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' }
]

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Open', value: 'open' },
  { label: 'In Review', value: 'in-review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' }
]

const rewardOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' }
]

const activeFilterCount = computed(() => {
  return localFilters.value.priority.length +
    localFilters.value.status.length +
    localFilters.value.reward.length
})

const hasActiveFilters = computed(() => {
  return localSearchQuery.value !== '' ||
    localFilters.value.priority.length > 0 ||
    localFilters.value.status.length > 0 ||
    localFilters.value.reward.length > 0
})

const updateSearch = (value: string) => {
  emit('update:searchQuery', value)
}

watch(() => localFilters.value, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })

const clearFilters = () => {
  localSearchQuery.value = ''
  localFilters.value = {
    priority: [],
    status: [],
    reward: []
  }
  emit('update:searchQuery', '')
  emit('update:filters', {
    priority: [],
    status: [],
    reward: []
  })
}
</script>