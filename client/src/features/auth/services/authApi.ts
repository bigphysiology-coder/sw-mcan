import type { User, AuthResponse, LoginPayload, RegisterPayload } from '@/types'

const USERS_KEY = 'mcan-users'
const delay = () => new Promise<void>((r) => setTimeout(r, 600))

function seedUsers() {
  if (localStorage.getItem(USERS_KEY)) return
  const users: User[] = [
    {
      id: '1',
      email: 'admin@mcan.ng',
      name: 'Admin User',
      role: 'admin',
      state: 'Lagos',
      phone: '+2348030000001',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'member@mcan.ng',
      name: 'Member User',
      role: 'member',
      state: 'Oyo',
      phone: '+2348030000002',
      createdAt: new Date().toISOString(),
    },
  ]
  const creds: Record<string, string> = {
    'admin@mcan.ng': 'admin123',
    'member@mcan.ng': 'member123',
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  localStorage.setItem('mcan-creds', JSON.stringify(creds))
}

seedUsers()

function getStoredUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[]
  } catch {
    return []
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function getCreds(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem('mcan-creds') || '{}') as Record<string, string>
  } catch {
    return {}
  }
}

function fakeToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ sub: user.id, email: user.email, role: user.role, iat: Date.now() }))
  const signature = btoa('fake-signature')
  return `${header}.${payload}.${signature}`
}

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    await delay()
    const users = getStoredUsers()
    const creds = getCreds()
    const user = users.find((u) => u.email === payload.email)
    if (!user || creds[payload.email] !== payload.password) {
      throw new Error('Invalid email or password')
    }
    return { user, token: fakeToken(user) }
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    await delay()
    const users = getStoredUsers()
    if (users.some((u) => u.email === payload.email)) {
      throw new Error('Email already registered')
    }
    const creds = getCreds()
    const newUser: User = {
      id: String(Date.now()),
      email: payload.email,
      name: payload.name,
      role: 'member',
      state: payload.state,
      phone: payload.phone,
      nyscCallUpNumber: payload.nyscCallUpNumber,
      createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    creds[payload.email] = payload.password
    saveUsers(users)
    localStorage.setItem('mcan-creds', JSON.stringify(creds))
    return { user: newUser, token: fakeToken(newUser) }
  },

  async logout(): Promise<void> {
    await delay()
  },

  getAllUsers(): User[] {
    return getStoredUsers()
  },
}
