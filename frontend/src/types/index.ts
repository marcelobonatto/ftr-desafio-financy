export interface UserType {
  id: string
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export type CategoryColor = 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';