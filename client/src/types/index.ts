export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'member' | 'admin' | 'superadmin'
  avatar?: string
  state?: string
  phone?: string
  nyscCallUpNumber?: string
  batch?: string
  lodge?: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  state: string
  chapter: string
  membershipType: 'full' | 'associate' | 'student' | 'corporate'
  occupation?: string
}

export interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'member' | 'admin' | 'superadmin'
  state?: string
  phone?: string
  nyscCallUpNumber?: string
  status: 'active' | 'pending' | 'suspended' | 'deactivated'
  membershipType?: 'full' | 'associate' | 'student' | 'corporate'
  chapter?: string
  occupation?: string
  avatar?: string
  createdAt: string
}

export interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: 'announcement' | 'news' | 'press-release' | 'update'
  author: string
  publishedAt: string
  tags: string[]
  featured?: boolean
  status: 'draft' | 'published'
}

export interface EventItem {
  id: string
  title: string
  description: string
  startDate: string
  endDate?: string
  location: {
    venue?: string
    address?: string
    city?: string
    state?: string
    isOnline?: boolean
    onlineLink?: string
  }
  coverImage: string
  category: 'meeting' | 'conference' | 'seminar' | 'workshop' | 'social' | 'other'
  capacity?: number
  isFree?: boolean
  organizerContact?: string
  status: 'draft' | 'published' | 'cancelled'
  slug: string
}

export interface DigitalIdRequest {
  id: string
  userId: string
  passportPhoto: string
  signature?: string
  additionalNote?: string
  status: 'pending' | 'approved' | 'rejected' | 'revoked'
  reason?: string
  createdAt: string
  fullName?: string
  state?: string
  nyscCallUpNumber?: string
  photo?: string
  phone?: string
  postHeld?: string
  validityBegin?: string
  validityEnd?: string
  holderSignature?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface Donation {
  id: string
  donor: string
  amount: string
  amountValue: number
  purpose: string
  date: string
  status: 'Pending' | 'Confirmed'
}

export interface Lodge {
  id: string
  name: string
  photo: string
  address: string
  state: string
  capacity: number
  status: 'Available' | 'Limited' | 'Full'
  coordinator: string
  phone: string
  map: string
}

export interface GalleryPhoto {
  id: string
  src: string
  caption: string
  span?: 'wide' | 'tall'
}

export interface Executive {
  id: string
  name: string
  role: string
  photo: string
  state: string
}

export interface WebContentSection {
  label: string
  visible: boolean
}

export interface WebContentStat {
  label: string
  value: string
  prefix?: string
  suffix?: string
}

export interface WebContentPillar {
  title: string
  description: string
}

export interface WebContentStateChapter {
  name: string
  members: string
}

export interface WebContent {
  headline: string
  subtitle?: string
  heroBackground?: string
  sections: WebContentSection[]
  stats?: WebContentStat[]
  pillars?: WebContentPillar[]
  stateChapters?: WebContentStateChapter[]
  ctaTitle?: string
  ctaSubtitle?: string
}

export interface ProgramItem {
  id: string
  title: string
  description: string
  category?: string
  type: 'program' | 'project'
  image?: string
  link?: string
}

export interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  category: 'general' | 'membership' | 'events' | 'partnership' | 'complaint' | 'other'
  message: string
  createdAt: string
  read: boolean
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}
