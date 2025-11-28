export type TaskStatus = 'open' | 'in-progress' | 'completed' | 'expired'
export type RequestStatus = 'open' | 'in-review' | 'expired'
export type Priority = 'low' | 'medium' | 'high'
export type Reward = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  reward: Reward
  createdAt: string
  dueDate?: string
    requester?: string

}

export interface Request {
  id: string
  title: string
  description: string
  status: RequestStatus
  priority: Priority
  reward: Reward
  createdAt: string
  dueDate?: string
  requester?: string
}

export type TaskOrRequest = Task | Request