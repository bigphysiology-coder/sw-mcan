import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { Button } from '@/components/ui/Button'
import { useSectionVisible, SectionHidden } from '@/utils/sectionVisibility'

const benefits = [
  { icon: '🕌', title: 'Spiritual Growth', description: 'Regular Islamic lectures, tafseer sessions, and group prayers to strengthen your faith.' },
  { icon: '🤝', title: 'Welfare Support', description: 'Financial and material assistance for corps members facing emergencies or hardships.' },
  { icon: '📈', title: 'Leadership Development', description: 'Workshops, mentorship, and opportunities to lead within the organisation.' },
  { icon: '👥', title: 'Community & Networking', description: 'Connect with Muslim corps members from diverse backgrounds across six states.' },
  { icon: '📅', title: 'Exclusive Events', description: 'Access to conventions, seminars, and social events organised by the zone.' },
  { icon: '🆔', title: 'MCAN Southwest ID Card', description: 'Official MCAN Southwest identity card for identification and benefits.' },
]

const requirements = [
  'Be a Muslim corps member currently serving in Lagos, Ogun, Oyo, Osun, Ondo, or Ekiti state.',
  'Possess a valid NYSC call-up number.',
  'Demonstrate commitment to Islamic values and community service.',
  'Complete the online registration form with accurate details.',
  'Agree to abide by the MCAN constitution and code of conduct.',
]

const steps = [
  { number: '01', title: 'Fill the Registration Form', description: 'Complete the online registration with your personal and NYSC details.' },
  { number: '02', title: 'Submit Your Application', description: 'Submit the form for review by your state chapter&rsquo;s executive team.' },
  { number: '03', title: 'Verification & Approval', description: 'Your details are verified and your membership is approved within 48 hours.' },
  { number: '04', title: 'Welcome Onboard', description: 'Receive your welcome kit, MCAN Southwest ID, and access to the members&rsquo; portal.' },
]

const faqs = [
  { q: 'Who can become a member of MCAN Southwest?', a: 'Any Muslim corps member currently serving in any of the six Southwest states is eligible to join.' },
  { q: 'Is membership free?', a: 'Yes, membership is completely free. There are no registration or subscription fees.' },
  { q: 'How long does the approval process take?', a: 'Applications are typically processed within 24–48 hours after submission.' },
  { q: 'Can I transfer my membership to another zone?', a: 'Yes, membership transfers between zones are possible through the national secretariat.' },
  { q: 'What benefits do I get as a member?', a: 'Members enjoy welfare support, leadership training, networking events, MCAN Southwest ID, and more.' },
]

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border-subtle">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-heading font-semibold text-text-heading">{q}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <p className="pb-4 text-sm leading-relaxed text-text-body">{a}</p>}
    </div>
  )
}

export default function MembershipPage() {
  const visible = useSectionVisible('Membership')
  if (!visible) return <SectionHidden />
  return (
    <>
      <section className="bg-gradient-to-br from-brand-strong via-brand to-green-800 py-24 text-white">
        <div className="container">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-gold-300">Join Us</p>
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Membership</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Become part of a vibrant community of Muslim corps members serving across the Southwest.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-brand">Benefits</p>
          <h2 className="mb-10 text-center font-heading text-3xl font-extrabold text-text-heading">Why Become a Member?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm">
                <span className="mb-4 block text-3xl">{b.icon}</span>
                <h3 className="mb-2 font-heading text-lg font-semibold text-text-heading">{b.title}</h3>
                <p className="text-sm leading-relaxed text-text-body">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-page py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-brand">Requirements</p>
            <h2 className="mb-8 text-center font-heading text-3xl font-extrabold text-text-heading">What You Need</h2>
            <ul className="space-y-3">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-text-body">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-brand">Process</p>
          <h2 className="mb-10 text-center font-heading text-3xl font-extrabold text-text-heading">How to Join</h2>
          <div className="grid gap-6 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.number} className="rounded-card border border-border-subtle bg-surface-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-button bg-brand-soft font-heading text-xl font-bold text-brand">
                  {s.number}
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-text-heading">{s.title}</h3>
                <p className="text-sm leading-relaxed text-text-body">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-page py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-brand">FAQ</p>
            <h2 className="mb-8 text-center font-heading text-3xl font-extrabold text-text-heading">Frequently Asked Questions</h2>
            <div className="rounded-card border border-border-subtle bg-surface-card px-6 shadow-sm">
              {faqs.map((faq) => (
                <Accordion key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-brand-strong via-brand to-green-800 py-24 text-center text-white">
        <div className="container">
          <h2 className="font-heading text-3xl font-extrabold lg:text-4xl">Ready to Join?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Take the first step towards a rewarding service year. Register now and become part of the MCAN Southwest family.
          </p>
          <div className="mt-8">
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center gap-2 rounded-button bg-accent px-7 py-3.5 font-semibold text-navy-800 shadow-md transition-all hover:bg-gold-400"
            >
              Executive Portal
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
