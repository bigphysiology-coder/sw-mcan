import { Badge } from '@/components/ui/Badge'
import type { Member } from '@/types'

interface MemberCardProps {
  member: Member
}

function MemberCard({ member }: MemberCardProps) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const statusVariant = {
    pending: 'gold',
    active: 'green',
    inactive: 'neutral',
    completed: 'neutral',
    rejected: 'red',
  } as const

  const digitalIdVariant = {
    not_requested: 'neutral',
    pending: 'gold',
    approved: 'green',
    rejected: 'red',
  } as const

  return (
    <div className="rounded-card border border-border-subtle bg-surface-card p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-soft font-bold text-brand">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-heading font-semibold text-text-heading">{member.name}</h3>
          <p className="truncate text-sm text-text-muted">{member.email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {member.state && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">State</span>
            <span className="font-medium text-text-heading">{member.state}</span>
          </div>
        )}
        {member.phone && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Phone</span>
            <span className="font-medium text-text-heading">{member.phone}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Status</span>
          <Badge tone={statusVariant[member.status]}>{member.status}</Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">MCAN Southwest ID</span>
          <Badge tone={digitalIdVariant[member.digitalIdStatus]}>
            {member.digitalIdStatus.replace('_', ' ')}
          </Badge>
        </div>
      </div>
    </div>
  )
}

export { MemberCard }
