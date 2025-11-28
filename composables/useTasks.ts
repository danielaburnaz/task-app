import { computed, readonly, ref } from "vue";
import type { Task, Request, Priority, Reward } from "../types/index";

export interface Filters {
  priority: Priority[]
  status: string[]
  reward: Reward[]
}

export const useTasks = () => {
  const tasks = ref<Task[]>([
    {
      id: "1",
      title: "Walk my dog",
      description: "Take the dog for a 30-minute walk around the neighborhood",
      status: "expired",
      priority: "medium",
      reward: "low",
      createdAt: "2025-11-28T10:00:00Z",
      dueDate: "2025-11-28T18:00:00Z",
      requester: "Sarah",
    },
    {
      id: "2",
      title: "Teach me yoga",
      description:
        "Provide a beginner-friendly 20-minute yoga session focused on flexibility and breathing",
      status: "open",
      priority: "high",
      reward: "medium",
      createdAt: "2025-11-28T10:10:00Z",
      dueDate: "2025-11-30T23:59:59Z",
      requester: "Michael",
    },
    {
      id: "3",
      title: "Grocery shopping",
      description:
        "Buy vegetables, fruits, milk, and other weekly essentials from the grocery store",
      status: "in-progress",
      priority: "medium",
      reward: "medium",
      createdAt: "2025-11-27T09:00:00Z",
      dueDate: "2025-11-28T23:59:59Z",
      requester: "Emma",
    },
    {
      id: "4",
      title: "Clean the kitchen",
      description:
        "Wash dishes, wipe countertops, clean the stove, and take out the trash",
      status: "open",
      priority: "low",
      reward: "low",
      createdAt: "2025-11-28T11:25:00Z",
      dueDate: "2025-11-29T23:59:59Z",
      requester: "James",
    },
    {
      id: "5",
      title: "Plan weekly meals",
      description:
        "Create a simple meal plan for the week including breakfast, lunch, and dinner",
      status: "open",
      priority: "medium",
      reward: "medium",
      createdAt: "2025-11-28T12:00:00Z",
      dueDate: "2025-12-01T23:59:59Z",
      requester: "Olivia",
    },
  ]);

  const requests = ref<Request[]>([
    {
      id: "r1",
      title: "Add dark mode support",
      description:
        "Users are requesting a dark theme option for better night-time viewing",
      status: "in-review",
      priority: "medium",
      reward: "medium",
      createdAt: "2025-11-22T10:00:00Z",
      dueDate: "2025-12-01T23:59:59Z",
      requester: "Jamie",
    },
    {
      id: "r2",
      title: "Mobile app development",
      description:
        "Request to develop native mobile applications for iOS and Android",
      status: "open",
      priority: "high",
      reward: "high",
      createdAt: "2025-11-24T09:00:00Z",
      dueDate: "2025-11-29T09:00:00Z",
      requester: "Sam",
    },
    {
      id: "r3",
      title: "Export to PDF feature",
      description: "Allow users to export their reports and data to PDF format",
      status: "open",
      priority: "medium",
      reward: "medium",
      createdAt: "2025-11-18T13:00:00Z",
      dueDate: "2025-12-03T10:15:00Z",
      requester: "Alex",
    },
    {
      id: "r4",
      title: "Integration with Slack",
      description: "Add Slack integration for notifications and updates",
      status: "expired",
      priority: "low",
      reward: "low",
      createdAt: "2025-11-15T11:00:00Z",
      dueDate: "2025-11-29T14:00:00Z",
      requester: "Zoe",
    },
    {
      id: "r5",
      title: "Real-time collaboration",
      description:
        "Enable multiple users to collaborate on documents in real-time",
      status: "in-review",
      priority: "high",
      reward: "high",
      createdAt: "2025-11-26T16:00:00Z",
      dueDate: "2025-12-01T08:45:00Z",
      requester: "Daniela",
    },
  ]);

  const searchQuery = ref('')
  const filters = ref<Filters>({
    priority: [],
    status: [],
    reward: []
  })

  const filterItems = <T extends Task | Request>(items: T[]): T[] => {
    let filtered = [...items]

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.requester && item.requester.toLowerCase().includes(query))
      )
    }

    if (filters.value.priority.length > 0) {
      filtered = filtered.filter(item =>
        filters.value.priority.includes(item.priority)
      )
    }

    if (filters.value.status.length > 0) {
      filtered = filtered.filter(item =>
        filters.value.status.includes(item.status)
      )
    }

    if (filters.value.reward.length > 0) {
      filtered = filtered.filter(item =>
        filters.value.reward.includes(item.reward)
      )
    }

    return filtered
  }

  const filteredTasks = computed(() => filterItems(tasks.value))
  const filteredRequests = computed(() => filterItems(requests.value))

  return {
    tasks: readonly(tasks),
    requests: readonly(requests),
    filteredTasks: readonly(filteredTasks),
    filteredRequests: readonly(filteredRequests),
    searchQuery,
    filters,
  };
};
