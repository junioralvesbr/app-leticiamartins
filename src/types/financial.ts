export type Revenue = {
  amount: number
  date: string
  description: string
  projectId?: string | null
}

export type ProjectExpense = {
  amount: number
  date: string
  description: string
  projectId: string
}

export type FixedExpense = {
  amount: number
  date: string
  description: string
  projectId?: never
}
