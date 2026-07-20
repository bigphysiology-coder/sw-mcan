import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/common/EmptyState'
import { useEvents } from '@/features/events/hooks/useEvents'
import type { EventItem } from '@/types'

const eventCategories = [
  { label: 'All', value: '' },
  { label: 'Meeting', value: 'meeting' },
  { label: 'Conference', value: 'conference' },
  { label: 'Seminar', value: 'seminar' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Social', value: 'social' },
  { label: 'Other', value: 'other' },
] as const

export default function EventsPage() {
  const { events, isLoading } = useEvents()
  const [activeCategory, setActiveCategory] = useState('')
  const [showPast, setShowPast] = useState(false)

  const filtered = events.filter((e) => {
    return !activeCategory || e.category === activeCategory
  })

  const now = new Date()
  const upcoming = filtered.filter((e) => new Date(e.startDate) >= now)
  const past = filtered.filter((e) => new Date(e.startDate) < now)

  function renderEventCard(event: EventItem) {
    return (
      <div
        key={event.id}
        className="overflow-hidden rounded-card border border-border-subtle bg-surface-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="h-44 bg-gradient-to-br from-brand to-brand-strong" />
        <div className="p-5">
          <Badge tone="neutral">{event.category}</Badge>
          <h3 className="mt-2 font-heading text-lg font-semibold text-text-heading">{event.title}</h3>
          <p className="mt-1 text-sm text-text-body line-clamp-2">{event.description}</p>
          <div className="mt-4 space-y-1 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location.venue || event.location.city || event.location.address || ''}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) return <div style={{ padding: '96px 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading events…</div>

  return (
    <>
      <section className="bg-gradient-to-br from-brand-strong via-brand to-green-800 py-24 text-white">
        <div className="container">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-gold-300">Calendar</p>
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">Events</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Stay connected with upcoming programmes, lectures, and community gatherings.
          </p>
        </div>
      </section>

      <section className="bg-surface-page py-12">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            {eventCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-pill px-4 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat.value
                    ? 'bg-brand text-white'
                    : 'bg-white text-text-body border border-border-default hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {upcoming.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map(renderEventCard)}
            </div>
          ) : (
            <div className="mt-10">
              <EmptyState
                title="No upcoming events"
                description="Check back soon for upcoming programmes."
              />
            </div>
          )}

          {past.length > 0 && (
            <div className="mt-16">
              <button
                onClick={() => setShowPast(!showPast)}
                className="flex w-full items-center justify-between rounded-card border border-border-subtle bg-white px-6 py-4 text-left shadow-sm transition-all hover:bg-gray-50"
              >
                <span className="font-heading text-lg font-semibold text-text-heading">
                  Past Events ({past.length})
                </span>
                <svg
                  className={`h-5 w-5 text-text-muted transition-transform ${showPast ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showPast && (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {past.map(renderEventCard)}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
