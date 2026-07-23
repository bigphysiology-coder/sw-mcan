import { useState, type FormEvent, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { STATES } from '@/constants'
import { useDigitalId } from '@/features/digital-id/hooks/useDigitalId'
import { uploadApi } from '@/api'

interface IdCardRequestProps {
  onSuccess?: () => void
}

function IdCardRequest({ onSuccess }: IdCardRequestProps) {
  const { requestDigitalId: submitRequest, isRequesting: isLoading } = useDigitalId()
  const photoInputRef = useRef<HTMLInputElement>(null)

  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  const [fullName, setFullName] = useState('')
  const [nyscCallUpNumber, setNyscCallUpNumber] = useState('')
  const [state, setState] = useState('')
  const [postHeld, setPostHeld] = useState('')
  const [validityBeginMonth, setValidityBeginMonth] = useState('')
  const [validityBeginYear, setValidityBeginYear] = useState('')
  const [validityEndMonth, setValidityEndMonth] = useState('')
  const [validityEndYear, setValidityEndYear] = useState('')
  const [phone, setPhone] = useState('')
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1.5px solid var(--border-default)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-body)', fontSize: '15px',
    color: 'var(--text-body)', background: 'var(--white)',
    outline: 'none', transition: 'border-color var(--dur-base) var(--ease-standard)',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    display: 'block', fontSize: '13px', fontWeight: 600,
    color: 'var(--text-heading)', marginBottom: '6px', fontFamily: 'var(--font-body)',
  } as React.CSSProperties

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer' as const,
    appearance: 'none' as const,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=10 height=6 viewBox=%220 0 10 6%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M1 1L5 5L9 1%22 stroke=%22%239CA3AF%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    paddingRight: '36px',
  } as React.CSSProperties

  const groupStyle = {
    marginBottom: '16px',
  } as React.CSSProperties

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!photoPreview) return
    if (!fullName || !nyscCallUpNumber || !state || !phone) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setIsUploading(true)
      const formData = new FormData()
      const blob = await fetch(photoPreview).then(r => r.blob())
      formData.append('file', blob, 'passport.jpg')
      const { url } = await uploadApi.uploadImage(formData)
      setIsUploading(false)

      await submitRequest({
        fullName,
        nyscCallUpNumber,
        state,
        phone,
        passportPhoto: url,
        postHeld: postHeld || undefined,
        validityBegin: validityBeginMonth && validityBeginYear ? `${validityBeginMonth} ${validityBeginYear}` : undefined,
        validityEnd: validityEndMonth && validityEndYear ? `${validityEndMonth} ${validityEndYear}` : undefined,
      })
      onSuccess?.()
    } catch (err) {
      setIsUploading(false)
      setError(err instanceof Error ? err.message : 'Failed to submit request')
    }
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setPhotoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{
      width: '100%', maxWidth: '512px',
      borderRadius: 'var(--radius-card)',
      border: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden',
    } as React.CSSProperties}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px' } as React.CSSProperties}>
        <h3 style={{
          fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600,
          color: 'var(--text-heading)', margin: 0,
        } as React.CSSProperties}>Request Your MCAN Southwest ID</h3>
        <p style={{
          fontSize: '14px', color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)', margin: '0 0 8px',
        } as React.CSSProperties}>
          Fill in your details to get your official MCAN identity card.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={groupStyle}>
            <label style={labelStyle}>Full Name</label>
            <input
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--green-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>State Code</label>
            <input
              placeholder="e.g. LA/24A/1234"
              value={nyscCallUpNumber}
              onChange={(e) => setNyscCallUpNumber(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--green-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>State Branch</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={selectStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--green-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
            >
              <option value="">Select your state</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Post Held (optional)</label>
            <input
              placeholder="e.g. Ameer, Secretary, PRO"
              value={postHeld}
              onChange={(e) => setPostHeld(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--green-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Validity Begin</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={validityBeginMonth}
                onChange={(e) => setValidityBeginMonth(e.target.value)}
                style={{ ...selectStyle, flex: 1 }}
                onFocus={(e) => e.target.style.borderColor = 'var(--green-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
              >
                <option value="">Month</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input
                placeholder="Year"
                value={validityBeginYear}
                onChange={(e) => setValidityBeginYear(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
                onFocus={(e) => e.target.style.borderColor = 'var(--green-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
              />
            </div>
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Validity End</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={validityEndMonth}
                onChange={(e) => setValidityEndMonth(e.target.value)}
                style={{ ...selectStyle, flex: 1 }}
                onFocus={(e) => e.target.style.borderColor = 'var(--green-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
              >
                <option value="">Month</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input
                placeholder="Year"
                value={validityEndYear}
                onChange={(e) => setValidityEndYear(e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
                onFocus={(e) => e.target.style.borderColor = 'var(--green-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
              />
            </div>
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = 'var(--green-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
            />
          </div>

          {/* Photo Upload */}
          <div style={groupStyle}>
            <label style={labelStyle}>Passport Photo</label>
            <div
              onClick={() => photoInputRef.current?.click()}
              style={{
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                border: '2px dashed var(--border-default)',
                padding: '24px', textAlign: 'center',
                transition: 'border-color var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)',
              } as React.CSSProperties}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--green-primary)'; e.currentTarget.style.background = 'var(--green-50)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.background = 'transparent' }}
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" style={{ marginBottom: '8px', width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover' } as React.CSSProperties} />
              ) : (
                <svg style={{ marginBottom: '8px', width: '40px', height: '40px', color: 'var(--gray-300)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                {photoPreview ? 'Click to change photo' : 'Click to upload photo'}
              </p>
              <p style={{ marginTop: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>PNG, JPG up to 5MB</p>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
            </div>
          </div>


          {error && (
            <p style={{ color: '#DC2626', fontSize: '14px', marginBottom: '12px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" style={{ width: '100%' } as React.CSSProperties} disabled={isUploading || isLoading}>
            {isUploading ? 'Uploading photo...' : isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export { IdCardRequest }
