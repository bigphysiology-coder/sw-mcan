export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^(\+234|0)[789]\d{9}$/.test(phone.replace(/\s/g, ''))
}

export function isStrongPassword(password: string): boolean {
  return password.length >= 8
}

export function isValidNyscCallUpNumber(num: string): boolean {
  return /^[A-Z]{2}\/\d{2}[A-Z]\/\d{4,6}$/i.test(num)
}

export function required(value: unknown, fieldName: string): string | null {
  if (value === undefined || value === null || value === '') return `${fieldName} is required`
  return null
}
