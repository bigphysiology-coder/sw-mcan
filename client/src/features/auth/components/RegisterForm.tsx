import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { STATES } from '@/constants'
import { isValidEmail, isStrongPassword } from '@/utils/validators'

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  state?: string
  phone?: string
  nyscCallUpNumber?: string
}

function RegisterForm() {
  const { register, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [state, setState] = useState('')
  const [phone, setPhone] = useState('')
  const [nyscCallUpNumber, setNyscCallUpNumber] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!isValidEmail(email.trim())) errs.email = 'Invalid email format'
    if (!password) errs.password = 'Password is required'
    else if (!isStrongPassword(password)) errs.password = 'Password must be at least 8 characters'
    if (!confirmPassword) errs.confirmPassword = 'Please confirm your password'
    else if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (!state) errs.state = 'State is required'
    if (phone && !/^(\+234|0)[789]\d{9}$/.test(phone.replace(/\s/g, ''))) {
      errs.phone = 'Invalid phone number'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setServerError(null)
    if (!validate()) return

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        state,
        phone: phone.trim() || undefined,
        nyscCallUpNumber: nyscCallUpNumber.trim() || undefined,
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.'
      setServerError(message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {serverError && (
        <div className="rounded-button border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
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
          <option value="">Select your state</option>
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
      </div>

      <Input
        label="Phone Number"
        type="tel"
        placeholder="080XXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={errors.phone}
      />

      <Input
        label="NYSC Call-up Number"
        type="text"
        placeholder="e.g. LA/24A/1234"
        value={nyscCallUpNumber}
        onChange={(e) => setNyscCallUpNumber(e.target.value)}
        error={errors.nyscCallUpNumber}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-button bg-brand px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-brand-strong focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] disabled:pointer-events-none disabled:opacity-50"
      >
        {isLoading ? (
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
  )
}

export { RegisterForm }
