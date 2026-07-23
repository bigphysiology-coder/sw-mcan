import { useState, type FormEvent } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { contactApi } from '@/features/contact/services/contactApi'
import { useSectionVisible, SectionHidden } from '@/utils/sectionVisibility'

const CONTACT_CATEGORIES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'membership', label: 'Membership' },
  { value: 'events', label: 'Events' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'other', label: 'Other' },
] as const

export default function Contact() {
  const visible = useSectionVisible('Contact')
  if (!visible) return <SectionHidden />
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('general')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '15px', padding: '13px 15px',
    borderRadius: 'var(--radius-button)', border: '1.5px solid var(--border-default)',
    background: 'var(--white)', color: 'var(--text-heading)', outline: 'none', width: '100%',
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    setSending(true)
    setError('')
    try {
      await contactApi.send({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        subject: subject.trim(),
        category,
        message: message.trim(),
        phone: phone.trim() || undefined,
      })
      setSubmitted(true)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setSubject('')
      setCategory('general')
      setMessage('')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <section className="container" style={{ padding: '76px var(--container-pad) 96px', textAlign: 'center' }}>
        <Reveal>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#10003;</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 8px' }}>Message sent!</h2>
          <p style={{ color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto 24px' }}>Thank you for reaching out. The MCAN Southwest secretariat will get back to you shortly.</p>
          <Button variant="secondary" size="md" onClick={() => setSubmitted(false)}>Send another message</Button>
        </Reveal>
      </section>
    )
  }

  return (
    <section className="container resp-grid-2" style={{ padding: '76px var(--container-pad) 96px', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '56px', alignItems: 'start' }}>
      <Reveal>
        <SectionHeading eyebrow="Contact" title="Reach the zonal secretariat" intro="Questions about membership, partnerships or projects? Send a note and the team will respond." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-500)' }}>Email</span>
            <span style={{ fontSize: '16px', color: 'var(--text-heading)' }}>mcansouthwestzone@gmail.com</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-500)' }}>Phone</span>
            <span style={{ fontSize: '16px', color: 'var(--text-heading)' }}>0903 044 6741 &middot; 0802 569 7328</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <form onSubmit={handleSubmit} style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-section)', padding: '32px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <input style={inputStyle} placeholder="First name *" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input style={inputStyle} placeholder="Last name *" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <input style={inputStyle} type="email" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input style={inputStyle} type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <select style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CONTACT_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <input style={inputStyle} placeholder="Subject *" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} placeholder="How can we help? *" value={message} onChange={(e) => setMessage(e.target.value)} required />
          {error && <p style={{ color: '#DC2626', fontSize: '14px', margin: 0 }}>{error}</p>}
          <Button variant="primary" size="lg" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'}</Button>
        </form>
      </Reveal>
    </section>
  )
}
