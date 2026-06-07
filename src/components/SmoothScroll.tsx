'use client'
import React from 'react'
import { ReactLenis } from 'lenis/react'

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={{ duration: 1.2, autoRaf: true }}>
      {children}
    </ReactLenis>
  )
}
