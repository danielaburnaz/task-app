export type TaskStatus = 'pending' | 'in-progress' | 'completed'
export type RequestStatus = 'open' | 'in-review' | 'approved' | 'rejected'
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