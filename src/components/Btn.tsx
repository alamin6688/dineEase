import React from 'react'
import Link from 'next/link'

interface BtnProps {
  children: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Btn({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: BtnProps) {
  const baseClass = `btn ${variant === 'secondary' ? 'btn-secondary' : ''} ${className}`

  const innerContent = (
    <>
      <span className="text-1">{children}</span>
      <span className="text-2">{children}</span>
    </>
  )

  if (href) {
    if (href.startsWith('#')) {
      return (
        <a href={href} onClick={onClick} className={baseClass}>
          {innerContent}
        </a>
      )
    }
    return (
      <Link href={href} onClick={onClick} className={baseClass}>
        {innerContent}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {innerContent}
    </button>
  )
}
