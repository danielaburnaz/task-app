<template>
  <NuxtCard class="hover:shadow-lg transition-shadow">
    <div class="space-y-3">
      <div class="flex items-start justify-between gap-2">
        <h3 class="text-lg font-semibold flex-1">
          {{ item.title }}
        </h3>
        <NuxtBadge :color="priorityColor" variant="subtle">
          {{ item.priority }}
        </NuxtBadge>
      </div>

      <p class="text-sm opacity-80">
        {{ item.description }}
      </p>

      <div class="flex flex-row flex-wrap gap-2">
        <NuxtBadge :color="statusColor">
          {{ formattedStatus }}
        </NuxtBadge>

        <NuxtBadge :color="rewardColor" variant="soft">
          {{ item.reward }} reward
        </NuxtBadge>
      </div>

      <div class="text-xs opacity-60 space-y-1">
        <div>Created: {{ formatDate(item.createdAt) }}</div>

        <div v-if="'dueDate' in item && item.dueDate">
          Due: <span :class="{ 'text-error font-medium': isOverdue }">
            {{ formatDate(item.dueDate) }}
          </span>
        </div>

        <div v-if="'requester' in item && item.requester">
          Requester: <span class="font-medium">{{ item.requester }}</span>
        </div>
      </div>
    </div>
  </NuxtCard>
</template>

<script setup lang="ts">
import type { Task, Request } from '../types/index'

interface Props {
  item: Task | Request
}

const props = defineProps<Props>()

const itemType = computed(() => {
  return 'dueDate' in props.item ? 'Task' : 'Request'
})

const formattedStatus = computed(() => {
  return props.item.status.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
})

const statusColor = computed(() => {
  const status = props.item.status

  if (status === 'completed') return 'success'
  if (status === 'in-progress' || status === 'in-review') return 'info'
  if (status === 'open') return 'warning'
  if (status === 'expired') return 'error'

  return 'neutral'
})

const priorityColor = computed(() => {
  const priority = props.item.priority

  if (priority === 'high') return 'error'
  if (priority === 'medium') return 'warning'
  if (priority === 'low') return 'neutral'

  return 'neutral'
})

const rewardColor = computed(() => {
  const reward = props.item.reward

  if (reward === 'high') return 'success'
  if (reward === 'medium') return 'info'
  if (reward === 'low') return 'secondary'

  return 'secondary'
})

const isOverdue = computed(() => {
  if ('dueDate' in props.item && props.item.dueDate) {
    return new Date(props.item.dueDate) < new Date()
  }
  return false
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>