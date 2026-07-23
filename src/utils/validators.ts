export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^(\+234|0)[789]\d{9}$/.test(phone.replace(/\s/g, ''))
}

const PASSWORD_UPPERCASE = /[A-Z]/
const PASSWORD_LOWERCASE = /[a-z]/
const PASSWORD_SPECIAL = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/

export function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    PASSWORD_UPPERCASE.test(password) &&
    PASSWORD_LOWERCASE.test(password) &&
    PASSWORD_SPECIAL.test(password)
  )
}

export function getPasswordErrors(password: string): string[] {
  const errors: string[] = []
  if (password.length < 8) errors.push('at least 8 characters')
  if (!PASSWORD_UPPERCASE.test(password)) errors.push('an uppercase letter')
  if (!PASSWORD_LOWERCASE.test(password)) errors.push('a lowercase letter')
  if (!PASSWORD_SPECIAL.test(password)) errors.push('a special character')
  return errors
}

export function isValidNyscCallUpNumber(num: string): boolean {
  return /^[A-Z]{2}\/\d{2}[A-Z]\/\d{4,6}$/i.test(num)
}

export function required(value: unknown, fieldName: string): string | null {
  if (value === undefined || value === null || value === '') return `${fieldName} is required`
  return null
}
