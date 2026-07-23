import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@/constants'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

class ApiClientError extends Error {
  status: number
  errors?: Record<string, string[]>

  constructor({ message, status, errors }: ApiError) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.errors = errors
  }
}

let isRefreshing = false
let refreshQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

async function refreshToken(): Promise<string> {
  const currentToken = getToken()
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: currentToken
      ? { Authorization: `Bearer ${currentToken}` }
      : undefined,
  })

  if (!res.ok) {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    window.location.href = '/login'
    throw new ApiClientError({
      message: 'Session expired. Please login again.',
      status: 401,
    })
  }

  const raw = await res.json()
  const inner = (raw.data ?? raw) as Record<string, unknown>
  const newToken = (inner.accessToken ?? inner.token) as string
  localStorage.setItem(AUTH_TOKEN_KEY, newToken)
  return newToken
}

function getToken(): string | null {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  return token && token !== 'undefined' ? token : null
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options?: RequestInit,
): Promise<T> {
  const url = `${BASE_URL}${path}`
  const token = getToken()

  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  }

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let res = await fetch(url, {
    method,
    headers,
    body:
      body instanceof FormData
        ? body
        : body
          ? JSON.stringify(body)
          : undefined,
    credentials: 'include',
    ...options,
  })

  const isAuthEndpoint = path === '/auth/login' || path === '/auth/register' || path === '/auth/refresh'

  if (res.status === 401 && !isAuthEndpoint) {
    if (!isRefreshing) {
      isRefreshing = true
      try {
        const newToken = await refreshToken()
        isRefreshing = false
        refreshQueue.forEach((q) => q.resolve(newToken))
        refreshQueue = []

        headers['Authorization'] = `Bearer ${newToken}`
        res = await fetch(url, {
          method,
          headers,
          body:
            body instanceof FormData
              ? body
              : body
                ? JSON.stringify(body)
                : undefined,
          credentials: 'include',
          ...options,
        })
      } catch (err) {
        isRefreshing = false
        refreshQueue.forEach((q) => q.reject(err))
        refreshQueue = []
        throw err
      }
    } else {
      const newToken = await new Promise<string>((resolve, reject) => {
        refreshQueue.push({ resolve, reject })
      })
      headers['Authorization'] = `Bearer ${newToken}`
      res = await fetch(url, {
        method,
        headers,
        body:
          body instanceof FormData
            ? body
            : body
              ? JSON.stringify(body)
              : undefined,
        credentials: 'include',
        ...options,
      })
    }
  }

  if (!res.ok) {
    let errorData: ApiError = {
      message: 'An unexpected error occurred',
      status: res.status,
    }
    try {
      const json = await res.json()
      const errs = json.errors as Record<string, string[]> | undefined
      const details = json.error?.details as Array<{ field: string; message: string }> | undefined
      errorData = {
        message: json.message || errorData.message,
        status: res.status,
        errors: errs ?? (details
          ? details.reduce<Record<string, string[]>>((acc, d) => {
              (acc[d.field] ??= []).push(d.message)
              return acc
            }, {})
          : undefined),
      }
    } catch {
      // ignore parse error
    }
    throw new ApiClientError(errorData)
  }

  if (res.status === 204) return undefined as T

  const json: unknown = await res.json()
  const obj = json as Record<string, unknown>
  if (obj && typeof obj === 'object' && (obj.success === true || obj.success === 'true') && 'data' in obj) {
    return obj.data as T
  }
  return json as T
}

export const client = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>('GET', path, undefined, options),

  post: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>('POST', path, body, options),

  put: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>('PUT', path, body, options),

  patch: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>('PATCH', path, body, options),

  delete: <T>(path: string, options?: RequestInit) =>
    request<T>('DELETE', path, undefined, options),
}

export { ApiClientError }
export type { ApiError }
