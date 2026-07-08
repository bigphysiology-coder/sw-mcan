import type { Executive } from '@/features/executives/types'

const EXEC_KEY = 'mcan-executives'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

function seed() {
  if (localStorage.getItem(EXEC_KEY)) return
  const execs: Executive[] = [
    { id: 'ex1', name: 'Abdulmalik Mahmud', role: 'President (Ameer)', state: 'MCAN SOUTH WEST', photo: '/photos/exec-abdulmalik.jpg' },
    { id: 'ex2', name: 'Ahmad Deedat Zakari, Esq.', role: 'Secretary General', state: 'MCAN SOUTH WEST', photo: '/photos/exec-ahmad.jpg' },
    { id: 'ex3', name: 'Aminah O. Abdurrahman', role: 'Ameerah (Sisters’ Affairs)', state: 'MCAN SOUTH WEST', photo: '/photos/exec-aminah.jpg' },
    { id: 'ex4', name: 'Abdulkudus Shehu Ghazali', role: "Da'wah Chairman", state: 'MCAN SOUTH WEST', photo: '/photos/exec-abdulkudus.jpg' },
    { id: 'ex5', name: 'Fadlullah O. Shittu', role: 'Business & Assets Officer', state: 'MCAN SOUTH WEST', photo: '/photos/exec-fadlullah.jpg' },
    { id: 'ex6', name: 'Hadi-Almu Umar Faruk', role: 'Public Relations Officer', state: 'MCAN SOUTH WEST', photo: '/photos/exec-hadi.jpg' },
    { id: 'ex7', name: 'Sameer A. Babayo', role: 'Director of Welfare', state: 'MCAN SOUTH WEST', photo: '/photos/exec-sameer.jpg' },
    { id: 'ex8', name: 'Sodiq Balogun Olabamiji', role: 'Financial Secretary', state: 'MCAN SOUTH WEST', photo: '/photos/exec-sodiq.jpg' },
  ]
  localStorage.setItem(EXEC_KEY, JSON.stringify(execs))
}

function normalizeState(state?: string): string {
  return state === 'MCAN' ? 'MCAN SOUTH WEST' : state || 'MCAN SOUTH WEST'
}

seed()

function getStored(): Executive[] {
  try {
    const stored = JSON.parse(localStorage.getItem(EXEC_KEY) || '[]') as Executive[]
    const normalized = stored.map((item) => ({
      ...item,
      state: normalizeState(item.state),
    }))
    if (stored.some((item, index) => item.state !== normalized[index].state)) {
      save(normalized)
    }
    return normalized
  } catch {
    return []
  }
}

function save(data: Executive[]) {
  localStorage.setItem(EXEC_KEY, JSON.stringify(data))
}

export const executivesApi = {
  async getExecutives(): Promise<Executive[]> {
    await delay()
    return getStored()
  },

  async getExecutive(id: string): Promise<Executive | undefined> {
    await delay()
    return getStored().find((e) => e.id === id)
  },

  async createExecutive(data: Omit<Executive, 'id'>): Promise<Executive> {
    await delay()
    const item: Executive = { ...data, id: `ex${Date.now()}` }
    const list = getStored()
    list.push(item)
    save(list)
    return item
  },

  async updateExecutive(id: string, data: Partial<Executive>): Promise<Executive> {
    await delay()
    const list = getStored()
    const idx = list.findIndex((e) => e.id === id)
    if (idx === -1) throw new Error('Executive not found')
    list[idx] = { ...list[idx], ...data }
    save(list)
    return list[idx]
  },

  async deleteExecutive(id: string): Promise<void> {
    await delay()
    save(getStored().filter((e) => e.id !== id))
  },
}
