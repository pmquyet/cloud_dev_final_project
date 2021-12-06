export interface TodoItem {
  userId: string
  todoId: string
  createdAt: string
  name: string
  done: boolean
  dueDate: string
  attachmentUrl?: string
}
