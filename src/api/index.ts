import { client } from './client'
import type {
  User,
  LoginPayload,
  RegisterPayload,
  Member,
  NewsItem,
  EventItem,
  DigitalIdRequest,
  ContactMessage,
  Donation,
  Executive,
  GalleryPhoto,
  Lodge,
  WebContent,
  ProgramItem,
} from '@/types'

// ──────────────────────────── UPLOADS ────────────────────────────

export const uploadApi = {
  uploadImage: (formData: FormData) =>
    client.post<{ url: string; publicId: string }>('/upload/image', formData),

  uploadDocument: (formData: FormData) =>
    client.post<{ url: string; publicId: string }>('/upload/document', formData),

  uploadSignature: (formData: FormData) =>
    client.post<{ url: string; publicId: string }>('/upload/signature', formData),

  delete: (publicId: string) =>
    client.delete<void>(`/upload/${publicId}`),
}

// ──────────────────────────── ADMIN STATS ────────────────────────────

export const adminApi = {
  getStats: (period?: string) =>
    client.get<{
      totalMembers: number
      pendingApprovals: number
      newsPublished: number
      upcomingEvents: number
      totalDonations: number
      totalContactMessages: number
    }>(`/admin/stats${period ? `?period=${period}` : ''}`),
}

// ──────────────────────────── NEWS ────────────────────────────

export const newsApi = {
  getPublic: async (params?: { page?: number; limit?: number; category?: string; search?: string; featured?: boolean }) => {
    const q = new URLSearchParams()
    q.set('_', Date.now().toString())
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.category) q.set('category', params.category)
    if (params?.search) q.set('search', params.search)
    if (params?.featured !== undefined) q.set('featured', String(params.featured))
    const qs = q.toString()
    const res = await client.get<Record<string, unknown>>(`/news?${qs}`)
    if (Array.isArray(res)) return res as NewsItem[]
    const obj = res as Record<string, unknown>
    return (obj.articles ?? obj.news ?? obj.data ?? []) as NewsItem[]
  },

  getBySlug: async (slug: string) => {
    const res = await client.get<Record<string, unknown>>(`/news/${slug}`)
    const obj = res as Record<string, unknown>
    return (obj.article ?? obj) as unknown as NewsItem
  },

  getAllAdmin: async (params?: { status?: string; search?: string }) => {
    const q = new URLSearchParams()
    q.set('_', Date.now().toString())
    if (params?.status) q.set('status', params.status)
    if (params?.search) q.set('search', params.search)
    const qs = q.toString()
    const res = await client.get<Record<string, unknown>>(`/news/admin/all?${qs}`)
    if (Array.isArray(res)) return res
    const obj = res as Record<string, unknown>
    return (obj.articles ?? obj.news ?? obj.data ?? []) as NewsItem[]
  },

  create: (data: {
    title: string
    content: string
    excerpt: string
    category: string
    coverImage?: string
    tags?: string[]
    featured?: boolean
    status?: string
  }) =>
    client.post<NewsItem>('/news', data),

  update: (id: string, data: Partial<NewsItem>) =>
    client.put<NewsItem>(`/news/${id}`, data),

  delete: (id: string) =>
    client.delete<void>(`/news/${id}`),

  publish: (id: string) =>
    client.patch<NewsItem>(`/news/${id}/publish`),

  unpublish: (id: string) =>
    client.patch<NewsItem>(`/news/${id}/unpublish`),
}

// ──────────────────────────── MEMBERS ────────────────────────────

export const membersApi = {
  getAll: async (params?: {
    page?: number; limit?: number; sortBy?: string; sortOrder?: string
    search?: string; status?: string; membershipType?: string
    state?: string; chapter?: string; digitalIdStatus?: string
  }) => {
    const q = new URLSearchParams()
    q.set('_', Date.now().toString())
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.sortBy) q.set('sortBy', params.sortBy)
    if (params?.sortOrder) q.set('sortOrder', params.sortOrder)
    if (params?.search) q.set('search', params.search)
    if (params?.status) q.set('status', params.status)
    if (params?.membershipType) q.set('membershipType', params.membershipType)
    if (params?.state) q.set('state', params.state)
    if (params?.chapter) q.set('chapter', params.chapter)
    if (params?.digitalIdStatus) q.set('digitalIdStatus', params.digitalIdStatus)
    const qs = q.toString()
    const res = await client.get<Record<string, unknown>>(`/members?${qs}`)
    if (Array.isArray(res)) return { data: res, total: res.length, page: 1, perPage: res.length, totalPages: 1 } as PaginatedResponse<Member>
    const obj = res as Record<string, unknown>
    const arr = (obj.members ?? obj.data ?? []) as Member[]
    return { data: arr, total: (obj.total as number) ?? arr.length, page: (obj.page as number) ?? 1, perPage: (obj.perPage as number) ?? arr.length, totalPages: (obj.totalPages as number) ?? 1 } as PaginatedResponse<Member>
  },

  getById: async (id: string) => {
    const res = await client.get<Record<string, unknown>>(`/members/${id}`)
    const obj = res as Record<string, unknown>
    return (obj.member ?? obj) as unknown as Member
  },

  update: (id: string, data: Partial<Member>) =>
    client.patch<Member>(`/members/${id}`, data),

  delete: (id: string) =>
    client.delete<void>(`/members/${id}`),

  updateStatus: (id: string, status: string, reason?: string) =>
    client.patch<Member>(`/members/${id}/status`, { status, reason }),

  updatePhoto: (id: string, formData: FormData) =>
    client.patch<Member>(`/members/${id}/photo`, formData),
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

// ──────────────────────────── EVENTS ────────────────────────────

export const eventsApi = {
  getPublic: async (params?: {
    page?: number; limit?: number; upcoming?: boolean; past?: boolean
    category?: string; state?: string; search?: string
  }) => {
    const q = new URLSearchParams()
    q.set('_', Date.now().toString())
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.upcoming !== undefined) q.set('upcoming', String(params.upcoming))
    if (params?.past !== undefined) q.set('past', String(params.past))
    if (params?.category) q.set('category', params.category)
    if (params?.state) q.set('state', params.state)
    if (params?.search) q.set('search', params.search)
    const qs = q.toString()
    const res = await client.get<Record<string, unknown>>(`/events?${qs}`)
    if (Array.isArray(res)) return res as EventItem[]
    const obj = res as Record<string, unknown>
    return (obj.events ?? obj.data ?? []) as EventItem[]
  },

  getBySlug: async (slug: string) => {
    const res = await client.get<Record<string, unknown>>(`/events/${slug}`)
    const obj = res as Record<string, unknown>
    return (obj.event ?? obj) as unknown as EventItem
  },

  getAllAdmin: async (params?: { status?: string }) => {
    const q = new URLSearchParams()
    q.set('_', Date.now().toString())
    if (params?.status) q.set('status', params.status)
    const res = await client.get<Record<string, unknown>>(`/events/admin/all?${q.toString()}`)
    if (Array.isArray(res)) return res as EventItem[]
    const obj = res as Record<string, unknown>
    return (obj.events ?? obj.data ?? []) as EventItem[]
  },

  create: (data: {
    title: string
    category: string
    startDate: string
    description?: string
    coverImage?: string
    location?: {
      venue?: string; address?: string; city?: string
      state?: string; isOnline?: boolean; onlineLink?: string
    }
    endDate?: string
    capacity?: number
    isFree?: boolean
    organizerContact?: string
    status?: string
  }) =>
    client.post<EventItem>('/events', data),

  update: (id: string, data: Partial<EventItem>) =>
    client.put<EventItem>(`/events/${id}`, data),

  delete: (id: string) =>
    client.delete<void>(`/events/${id}`),

  publish: (id: string) =>
    client.patch<EventItem>(`/events/${id}/publish`),

  cancel: (id: string, reason?: string) =>
    client.patch<EventItem>(`/events/${id}/cancel`, { reason }),
}

// ──────────────────────────── DIGITAL ID ────────────────────────────

export const digitalIdApi = {
  request: (data: {
    fullName: string
    nyscCallUpNumber: string
    state: string
    phone: string
    passportPhoto: string
    postHeld?: string
    validityBegin?: string
    validityEnd?: string
    signature?: string
    additionalNote?: string
  }) =>
    client.post<DigitalIdRequest>('/digital-id/request', data),

  getMyId: () =>
    client.get<DigitalIdRequest>('/digital-id/my-id'),

  getAll: async (params?: { page?: number; limit?: number; status?: string; search?: string }) => {
    const q = new URLSearchParams()
    q.set('_', Date.now().toString())
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.status) q.set('status', params.status)
    if (params?.search) q.set('search', params.search)
    const qs = q.toString()
    const res = await client.get<Record<string, unknown>>(`/digital-id?${qs}`)
    if (Array.isArray(res)) return res as DigitalIdRequest[]
    const obj = res as Record<string, unknown>
    return (obj.digitalIds ?? obj.requests ?? obj.data ?? []) as DigitalIdRequest[]
  },

  getById: async (id: string) => {
    const res = await client.get<Record<string, unknown>>(`/digital-id/${id}`)
    const obj = res as Record<string, unknown>
    return (obj.digitalId ?? obj.request ?? obj) as unknown as DigitalIdRequest
  },

  approve: (id: string, note?: string) =>
    client.patch<DigitalIdRequest>(`/digital-id/${id}/approve`, { note }),

  reject: (id: string, reason: string) =>
    client.patch<DigitalIdRequest>(`/digital-id/${id}/reject`, { reason }),

  downloadImage: (id: string) =>
    client.get<{ url: string }>(`/digital-id/${id}/download/image`),

  downloadPdf: (id: string) =>
    client.get<{ url: string }>(`/digital-id/${id}/download/pdf`),

  revoke: (id: string, reason: string) =>
    client.patch<void>(`/digital-id/${id}/revoke`, { reason }),
}

// ──────────────────────────── CONTACT ────────────────────────────

export const contactApi = {
  send: (data: {
    firstName: string
    lastName: string
    email: string
    subject: string
    category: string
    message: string
    phone?: string
  }) =>
    client.post<ContactMessage>('/contact', data),

  getAll: async (params?: { page?: number; limit?: number; isRead?: boolean; category?: string }) => {
    const q = new URLSearchParams()
    q.set('_', Date.now().toString())
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.isRead !== undefined) q.set('isRead', String(params.isRead))
    if (params?.category) q.set('category', params.category)
    const qs = q.toString()
    const res = await client.get<Record<string, unknown>>(`/contact?${qs}`)
    if (Array.isArray(res)) return res as ContactMessage[]
    const obj = res as Record<string, unknown>
    return (obj.messages ?? obj.contact ?? obj.data ?? []) as ContactMessage[]
  },

  getById: async (id: string) => {
    const res = await client.get<Record<string, unknown>>(`/contact/${id}`)
    const obj = res as Record<string, unknown>
    return (obj.message ?? obj.contact ?? obj) as unknown as ContactMessage
  },

  delete: (id: string) =>
    client.delete<void>(`/contact/${id}`),

  markAsRead: (id: string) =>
    client.patch<void>(`/contact/${id}/read`),
}

// ──────────────────────────── AUTH ────────────────────────────

export const authApi = {
  register: (data: RegisterPayload) =>
    client.post<{ user: User; accessToken: string }>('/auth/register', data),

  login: (data: LoginPayload) =>
    client.post<{ user: User; accessToken: string }>('/auth/login', data),

  logout: () =>
    client.post<void>('/auth/logout'),

  refresh: () =>
    client.post<{ accessToken: string }>('/auth/refresh'),

  getMe: () =>
    client.get<User>('/auth/me'),

  changePassword: (data: { currentPassword: string; newPassword: string; confirmNewPassword: string }) =>
    client.patch<void>('/auth/change-password', data),

  forgotPassword: (data: { email: string }) =>
    client.post<void>('/auth/forgot-password', data),

  resetPassword: (data: { token: string; password: string }) =>
    client.post<void>('/auth/reset-password', data),
}

// ──────────────────────────── ADMIN USERS (superadmin) ────────────────────────────

export const adminUsersApi = {
  getAll: async () => {
    const res = await client.get<Record<string, unknown>>('/admin-users')
    if (Array.isArray(res)) return res as User[]
    const obj = res as Record<string, unknown>
    return (obj.users ?? obj.data ?? []) as User[]
  },

  invite: (data: { email: string; role: string }) =>
    client.post<User>('/admin-users/invite', data),

  updateRole: (id: string, role: string) =>
    client.patch<User>(`/admin-users/${id}/role`, { role }),

  deactivate: (id: string) =>
    client.patch<void>(`/admin-users/${id}/deactivate`),

  reactivate: (id: string) =>
    client.patch<void>(`/admin-users/${id}/reactivate`),
}

// ──────────────────────────── DONATIONS ────────────────────────────

export const donationsApi = {
  getAll: async (params?: { page?: number; limit?: number; status?: string }) => {
    const q = new URLSearchParams()
    q.set('_', Date.now().toString())
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.status) q.set('status', params.status)
    const qs = q.toString()
    const res = await client.get<Record<string, unknown>>(`/donations?${qs}`)
    if (Array.isArray(res)) return res as Donation[]
    const obj = res as Record<string, unknown>
    return (obj.donations ?? obj.data ?? []) as Donation[]
  },

  create: (data: { donor: string; amount: string; amountValue?: number; purpose: string; date?: string; status?: string }) =>
    client.post<Donation>('/donations', data),

  update: (id: string, data: Partial<Donation>) =>
    client.patch<Donation>(`/donations/${id}`, data),

  delete: (id: string) =>
    client.delete<void>(`/donations/${id}`),

  getStats: async () => {
    const res = await client.get<Record<string, unknown>>('/donations/stats')
    const obj = res as Record<string, unknown>
    return (obj.stats ?? obj) as unknown as { totalDonations: number; raisedYear: number; raisedMonth: number }
  },
}

// ──────────────────────────── EXECUTIVES ────────────────────────────

export const executivesApi = {
  getAll: async () => {
    const res = await client.get<Record<string, unknown>>('/executives')
    if (Array.isArray(res)) return res as Executive[]
    const obj = res as Record<string, unknown>
    return (obj.executives ?? obj.data ?? []) as Executive[]
  },

  create: (data: { name: string; role: string; photo: string; state: string }) =>
    client.post<Executive>('/executives', data),

  update: (id: string, data: Partial<Executive>) =>
    client.put<Executive>(`/executives/${id}`, data),

  delete: (id: string) =>
    client.delete<void>(`/executives/${id}`),
}

// ──────────────────────────── GALLERY ────────────────────────────

export const galleryApi = {
  getAll: async () => {
    const res = await client.get<Record<string, unknown>>('/gallery')
    if (Array.isArray(res)) return res as GalleryPhoto[]
    const obj = res as Record<string, unknown>
    return (obj.gallery ?? obj.photos ?? obj.data ?? []) as GalleryPhoto[]
  },

  create: (data: { src: string; caption: string; span?: string }) =>
    client.post<GalleryPhoto>('/gallery', data),

  update: (id: string, data: Partial<GalleryPhoto>) =>
    client.put<GalleryPhoto>(`/gallery/${id}`, data),

  delete: (id: string) =>
    client.delete<void>(`/gallery/${id}`),

  upload: (formData: FormData) =>
    client.post<{ url: string; publicId: string }>('/gallery/upload', formData),
}

// ──────────────────────────── LODGES ────────────────────────────

export const lodgesApi = {
  getAll: async (params?: { status?: string; state?: string }) => {
    const q = new URLSearchParams()
    q.set('_', Date.now().toString())
    if (params?.status) q.set('status', params.status)
    if (params?.state) q.set('state', params.state)
    const qs = q.toString()
    const res = await client.get<Record<string, unknown>>(`/lodges?${qs}`)
    if (Array.isArray(res)) return res as Lodge[]
    const obj = res as Record<string, unknown>
    return (obj.lodges ?? obj.data ?? []) as Lodge[]
  },

  create: (data: { name: string; photo: string; address: string; state: string; capacity: number; status: string; coordinator: string; phone: string; map: string }) =>
    client.post<Lodge>('/lodges', data),

  update: (id: string, data: Partial<Lodge>) =>
    client.put<Lodge>(`/lodges/${id}`, data),

  delete: (id: string) =>
    client.delete<void>(`/lodges/${id}`),
}

// ──────────────────────────── WEB CONTENT ────────────────────────────

export const webContentApi = {
  get: async () => {
    const res = await client.get<Record<string, unknown>>('/webcontent')
    const obj = res as Record<string, unknown>
    return (obj.webContent ?? obj) as unknown as WebContent
  },

  create: (data: {
    headline?: string
    subtitle?: string
    heroBackground?: string
    sections?: { label: string; visible: boolean }[]
    stats?: { label: string; value: string; prefix?: string; suffix?: string }[]
    pillars?: { title: string; description: string }[]
    stateChapters?: { name: string; members: string }[]
    ctaTitle?: string
    ctaSubtitle?: string
  }) =>
    client.post<WebContent>('/webcontent', data),

  update: (data: {
    headline?: string
    subtitle?: string
    heroBackground?: string
    sections?: { label: string; visible: boolean }[]
    stats?: { label: string; value: string; prefix?: string; suffix?: string }[]
    pillars?: { title: string; description: string }[]
    stateChapters?: { name: string; members: string }[]
    ctaTitle?: string
    ctaSubtitle?: string
  }) =>
    client.put<WebContent>('/webcontent', data),
}

// ──────────────────────────── PROGRAMS ────────────────────────────

export const programsApi = {
  getAll: async () => {
    const res = await client.get<Record<string, unknown>>('/programs')
    if (Array.isArray(res)) return res as ProgramItem[]
    const obj = res as Record<string, unknown>
    return (obj.programs ?? obj.data ?? []) as ProgramItem[]
  },
}
