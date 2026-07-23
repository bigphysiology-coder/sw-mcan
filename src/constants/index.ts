export const APP_NAME = 'MCAN Southwest'
export const APP_TAGLINE = 'Serving Islam through the Nation'
export const APP_DESCRIPTION = 'The regional coordinating body of the Muslim Corpers\' Association of Nigeria across Lagos, Ogun, Oyo, Osun, Ondo and Ekiti.'

export const STATES = ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'] as const

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export const AUTH_TOKEN_KEY = 'mcan-auth-token'
export const AUTH_USER_KEY = 'mcan-auth-user'

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  NEWS: '/news',
  EVENTS: '/events',
  MEMBERSHIP: '/membership',
  CONTACT: '/contact',
  DIGITAL_ID: '/digital-id',
  LOGIN: '/login',
  SIGNUP: '/signup',
  WELCOME: '/welcome',
  ADMIN: {
    DASHBOARD: '/admin',
    MEMBERS: '/admin/members',
    APPROVALS: '/admin/approvals',
    NEWS: '/admin/news',
    EVENTS: '/admin/events',
    DONORS: '/admin/donors',
    PROGRAMS: '/admin/programs',
    LODGES: '/admin/lodges',
    PROJECTS: '/admin/projects',
    MESSAGES: '/admin/messages',
    SETTINGS: '/admin/settings',
    DIGITAL_IDS: '/admin/digital-ids',
  },
} as const
