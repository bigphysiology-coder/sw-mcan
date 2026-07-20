import { Badge } from '@/components/ui/Badge'
import type { EventItem } from '@/types'

interface EventCardProps {
  event: EventItem
}

const typeVariants: Record<string, 'neutral' | 'green' | 'gold'> = {
  lecture: 'neutral',
  welfare: 'green',
  education: 'neutral',
  outreach: 'gold',
  convention: 'neutral',
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border-subtle bg-surface-card">
      {event.coverImage ? (
        <img src={event.coverImage} alt={event.title} className="h-44 w-full object-cover" />
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-gray-200 text-gray-400">
          <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      <div className="relative">
        <div className="absolute left-3 top-3">
          <Badge tone={typeVariants[event.category] ?? 'neutral'}>{event.category}</Badge>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-text-heading">{event.title}</h3>

        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location.venue || event.location.city || event.location.address || ''}</span>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-text-body">{event.description}</p>

      </div>
    </div>
  )
}

export { EventCard }
