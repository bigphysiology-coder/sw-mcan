import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'
import { ROUTES, STATES, APP_NAME } from '@/constants'
import { isValidEmail, isStrongPassword, isValidPhone, getPasswordErrors } from '@/utils/validators'

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  state?: string
  chapter?: string
  membershipType?: string
}

interface ConfirmationState {
  firstName: string
  email: string
}

const MEMBERSHIP_TYPES = [
  { value: 'full', label: 'Full' },
  { value: 'associate', label: 'Associate' },
  { value: 'student', label: 'Student' },
  { value: 'corporate', label: 'Corporate' },
] as const

function RegisterForm() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [state, setState] = useState('')
  const [chapter, setChapter] = useState('')
  const [membershipType, setMembershipType] = useState('full')
  const [occupation, setOccupation] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState<ConfirmationState | null>(null)

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!firstName.trim()) errs.firstName = 'First name is required'
    if (!lastName.trim()) errs.lastName = 'Last name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!isValidEmail(email.trim())) errs.email = 'Invalid email format'
    if (!phone.trim()) errs.phone = 'Phone number is required'
    else if (!isValidPhone(phone.trim())) errs.phone = 'Invalid phone number (e.g. +2348012345678)'
    if (!password) errs.password = 'Password is required'
    else if (!isStrongPassword(password)) {
      const pwdErrors = getPasswordErrors(password)
      errs.password = 'Password must contain ' + pwdErrors.join(', ')
    }
    if (!confirmPassword) errs.confirmPassword = 'Please confirm your password'
    else if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (!state) errs.state = 'State is required'
    if (!chapter.trim()) errs.chapter = 'Chapter is required'
    if (!membershipType) errs.membershipType = 'Membership type is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setServerError(null)
    if (!validate()) return
    setSubmitting(true)

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      confirmPassword,
      state,
      chapter: chapter.trim(),
      membershipType: membershipType as 'full' | 'associate' | 'student' | 'corporate',
      occupation: occupation.trim() || undefined,
    }

    const BASE_URL = import.meta.env.VITE_API_URL || '/api'

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
        signal: controller.signal,
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setServerError(body.message || `Registration failed (${res.status})`)
        clearTimeout(timeout)
        setSubmitting(false)
        return
      }

      const body = await res.json()
      clearTimeout(timeout)
      const data = body.data ?? body
      const token = data.accessToken ?? data.token ?? null

      const user = {
        id: data.id || data.userId || data._id || '',
        firstName: data.firstName || payload.firstName,
        lastName: data.lastName || '',
        email: data.email || payload.email,
        role: data.role || 'member' as const,
        createdAt: data.createdAt || new Date().toISOString(),
      }

      setAuth(user as Parameters<typeof setAuth>[0], token || '')

      setConfirmed({ firstName: payload.firstName, email: payload.email })
      setSubmitting(false)
    } catch (err) {
      clearTimeout(timeout)
      if (err instanceof DOMException && err.name === 'AbortError') {
        setServerError('The server is taking too long to respond. Your account may have been created — please check your email or try logging in.')
      } else {
        setServerError('Network error. Please check your connection and try again.')
      }
      setSubmitting(false)
    }
  }

  // —— Show confirmation screen when account created ——

  if (confirmed) {
    return (
      <div style={{ textAlign: 'center' as const }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 16px',
            borderRadius: '50%',
            background: 'var(--green-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          } as React.CSSProperties}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--green-primary)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '20px',
            color: 'var(--text-heading)',
            margin: '0 0 8px',
          } as React.CSSProperties}
        >
          Account created!
        </h2>

        <p
          style={{
            margin: '0 0 4px',
            fontSize: '14px',
            color: 'var(--text-body)',
            lineHeight: 1.6,
          } as React.CSSProperties}
        >
          Welcome to {APP_NAME}, {confirmed.firstName}.
        </p>

        <p
          style={{
            margin: '0 0 20px',
            fontSize: '14px',
            color: 'var(--text-body)',
            lineHeight: 1.6,
          } as React.CSSProperties}
        >
          You are now signed in. Start exploring the portal.
        </p>

        <button
          onClick={() => {
            navigate(ROUTES.HOME, { replace: true })
          }}
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--green-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-button)',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          } as React.CSSProperties}
        >
          Go to home
        </button>
      </div>
    )
  }

  // —— Registration form ——

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {serverError && (
          <div className="rounded-button border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+2348012345678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
        />

        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />

        <div className="grid grid-cols-2 gap-3">
          <div className="w-full">
            <label htmlFor="state" className="mb-1 block text-sm font-semibold text-text-heading">
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={`w-full rounded-button border bg-white px-4 py-3 text-sm text-text-heading outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-[var(--color-focus-ring)] ${errors.state ? 'border-red-500' : 'border-border-default'}`}
            >
              <option value="">Select state</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
          </div>

          <Input
            label="Chapter / LGA"
            type="text"
            placeholder="e.g. Ikeja"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            error={errors.chapter}
          />
        </div>

        <div className="w-full">
          <label htmlFor="membershipType" className="mb-1 block text-sm font-semibold text-text-heading">
            Membership Type
          </label>
          <select
            id="membershipType"
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value)}
            className="w-full rounded-button border border-border-default bg-white px-4 py-3 text-sm text-text-heading outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-[var(--color-focus-ring)]"
          >
            {MEMBERSHIP_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <Input
          label="Occupation (optional)"
          type="text"
          placeholder="e.g. Engineer"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-button bg-brand px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-brand-strong focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] disabled:pointer-events-none disabled:opacity-50"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>

        <p className="mt-4 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </>
  )
}

export { RegisterForm }
