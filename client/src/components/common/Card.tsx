import { type ReactNode } from 'react'

interface CardProps {
  image?: string
  title?: string
  subtitle?: string
  children?: ReactNode
  className?: string
  onClick?: () => void
}

function Card({ image, title, subtitle, children, className = '', onClick }: CardProps) {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      onClick={onClick}
      className={`w-full rounded-card border border-border-subtle bg-surface-card text-left shadow-sm ${onClick ? 'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md' : ''} overflow-hidden ${className}`}
    >
      {image && (
        <img src={image} alt={title || ''} className="h-44 w-full object-cover" />
      )}
      <div className="flex flex-col gap-2 p-5">
        {title && <h3 className="font-heading text-lg font-semibold text-text-heading">{title}</h3>}
        {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
        {children}
      </div>
    </Tag>
  )
}

export { Card }
