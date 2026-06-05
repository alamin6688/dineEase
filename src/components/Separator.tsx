import React from 'react'

export default function Separator({ className = '' }: { className?: string }) {
  return <div className={`separator select-none flex-shrink-0 ${className}`} />
}
