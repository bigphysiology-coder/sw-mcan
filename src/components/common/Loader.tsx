interface LoaderProps {
  fullScreen?: boolean
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const sizeClasses: Record<string, string> = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

function Loader({ fullScreen = false, size = 'md', text }: LoaderProps) {
  const spinner = (
    <div
      className={`animate-spin rounded-full border-2 border-green-200 border-t-brand ${sizeClasses[size]}`}
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
        <div className="flex flex-col items-center gap-2">
          {spinner}
          {text && <p className="mt-3 text-sm text-text-muted">{text}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="inline-flex flex-col items-center gap-2">
      {spinner}
      {text && <p className="text-sm text-text-muted">{text}</p>}
    </div>
  )
}

export { Loader }
