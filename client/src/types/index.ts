export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'member'
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
  token: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  state: string
  phone?: string
  nyscCallUpNumber?: string
}

export interface Member extends User {
  status: 'pending' | 'active' | 'inactive' | 'completed' | 'rejected'
  digitalIdStatus: 'not_requested' | 'pending' | 'approved' | 'rejected'
  reason?: string
}

export interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  publishedAt: string
  tags: string[]
}

export interface EventItem {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  type: 'lecture' | 'welfare' | 'education' | 'outreach' | 'convention'
  registrationUrl?: string
}

export interface DigitalIdRequest {
  id: string
  userId: string
  fullName: string
  nyscCallUpNumber: string
  state: string
  postHeld: string
  validityBegin: string
  validityEnd: string
  phone: string
  photo: string
  holderSignature: string
  status: 'pending' | 'approved' | 'rejected'
  reason?: string
  createdAt: string
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

export interface WebContent {
  headline: string
  sections: WebContentSection[]
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}
