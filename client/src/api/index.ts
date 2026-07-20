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
  getPublic: (params?: { page?: number; limit?: number; category?: string; search?: string; featured?: boolean }) => {
    const q = new URLSearchParams()
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.category) q.set('category', params.category)
    if (params?.search) q.set('search', params.search)
    if (params?.featured !== undefined) q.set('featured', String(params.featured))
    const qs = q.toString()
    return client.get<NewsItem[]>(`/news${qs ? `?${qs}` : ''}`)
  },

  getBySlug: (slug: string) =>
    client.get<NewsItem>(`/news/${slug}`),

  getAllAdmin: (params?: { status?: string; search?: string }) => {
    const q = new URLSearchParams()
    if (params?.status) q.set('status', params.status)
    if (params?.search) q.set('search', params.search)
    const qs = q.toString()
    return client.get<NewsItem[]>(`/news/admin/all${qs ? `?${qs}` : ''}`)
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
  getAll: (params?: {
    page?: number; limit?: number; sortBy?: string; sortOrder?: string
    search?: string; status?: string; membershipType?: string
    state?: string; chapter?: string; digitalIdStatus?: string
  }) => {
    const q = new URLSearchParams()
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
    return client.get<PaginatedResponse<Member>>(`/members${qs ? `?${qs}` : ''}`)
  },

  getById: (id: string) =>
    client.get<Member>(`/members/${id}`),

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
  getPublic: (params?: {
    page?: number; limit?: number; upcoming?: boolean; past?: boolean
    category?: string; state?: string; search?: string
  }) => {
    const q = new URLSearchParams()
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.upcoming !== undefined) q.set('upcoming', String(params.upcoming))
    if (params?.past !== undefined) q.set('past', String(params.past))
    if (params?.category) q.set('category', params.category)
    if (params?.state) q.set('state', params.state)
    if (params?.search) q.set('search', params.search)
    const qs = q.toString()
    return client.get<EventItem[]>(`/events${qs ? `?${qs}` : ''}`)
  },

  getBySlug: (slug: string) =>
    client.get<EventItem>(`/events/${slug}`),

  getAllAdmin: (params?: { status?: string }) => {
    const qs = params?.status ? `?status=${params.status}` : ''
    return client.get<EventItem[]>(`/events/admin/all${qs}`)
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
    passportPhoto: string
    signature?: string
    additionalNote?: string
  }) =>
    client.post<DigitalIdRequest>('/digital-id/request', data),

  getMyId: () =>
    client.get<DigitalIdRequest>('/digital-id/my-id'),

  getAll: (params?: { page?: number; limit?: number; status?: string; search?: string }) => {
    const q = new URLSearchParams()
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.status) q.set('status', params.status)
    if (params?.search) q.set('search', params.search)
    const qs = q.toString()
    return client.get<DigitalIdRequest[]>(`/digital-id${qs ? `?${qs}` : ''}`)
  },

  getById: (id: string) =>
    client.get<DigitalIdRequest>(`/digital-id/${id}`),

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

  getAll: (params?: { page?: number; limit?: number; isRead?: boolean; category?: string }) => {
    const q = new URLSearchParams()
    if (params?.page) q.set('page', String(params.page))
    if (params?.limit) q.set('limit', String(params.limit))
    if (params?.isRead !== undefined) q.set('isRead', String(params.isRead))
    if (params?.category) q.set('category', params.category)
    const qs = q.toString()
    return client.get<ContactMessage[]>(`/contact${qs ? `?${qs}` : ''}`)
  },

  getById: (id: string) =>
    client.get<ContactMessage>(`/contact/${id}`),

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
  getAll: () =>
    client.get<User[]>('/admin-users'),

  invite: (data: { email: string; role: string }) =>
    client.post<User>('/admin-users/invite', data),

  updateRole: (id: string, role: string) =>
    client.patch<User>(`/admin-users/${id}/role`, { role }),

  deactivate: (id: string) =>
    client.patch<void>(`/admin-users/${id}/deactivate`),

  reactivate: (id: string) =>
    client.patch<void>(`/admin-users/${id}/reactivate`),
}
