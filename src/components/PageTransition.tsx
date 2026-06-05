/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

// 1. Transition state type
type TransitionState = 'idle' | 'animating-in' | 'loading' | 'animating-out'

interface NavigationContextType {
  state: TransitionState
  navigate: (href: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider')
  return context
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  
  const [state, setState] = useState<TransitionState>('idle')
  const [pendingPath, setPendingPath] = useState<string | null>(null)

  const navigate = useCallback((href: string) => {
    if (state !== 'idle') return
    
    // Start transition animation in
    setState('animating-in')
    setPendingPath(href)
  }, [state])

  // Intercept all internal page links globally
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Ignore standard non-navigation hrefs (e.g. tel:, mailto:, javascript:)
      if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        return
      }

      // Check target
      if (anchor.target && anchor.target !== '_self') return

      // Check if it's a modified click (ctrl, shift, cmd, middle-click)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return

      // Determine absolute path
      const currentOrigin = window.location.origin
      let targetUrl: URL
      try {
        targetUrl = new URL(href, currentOrigin)
      } catch {
        return
      }

      // If it's external, don't transition
      if (targetUrl.origin !== currentOrigin) return

      // If it's a hash anchor on the same page path, don't transition (just scroll)
      const isSamePath = targetUrl.pathname === window.location.pathname
      if (isSamePath) {
        return
      }

      // Prevent default next.js or browser navigation
      e.preventDefault()
      navigate(href)
    }

    document.addEventListener('click', handleLinkClick, { capture: true })
    return () => document.removeEventListener('click', handleLinkClick, { capture: true })
  }, [state, pathname, navigate])

  // Handle stage 1: transition is fully in -> navigate
  useEffect(() => {
    if (state === 'animating-in' && pendingPath) {
      // Entrance stagger is 2 * 0.1s + 0.55s = 0.75s
      // Wait 750ms for panels to fully slide in and cover the screen
      const timer = setTimeout(() => {
        setState('loading')
        router.push(pendingPath)
      }, 750)

      return () => clearTimeout(timer)
    }
  }, [state, pendingPath, router])

  // Handle stage 2: route has updated behind the curtain -> transition out
  useEffect(() => {
    if (state === 'loading') {
      const targetPath = pendingPath ? new URL(pendingPath, window.location.origin).pathname : null
      
      if (pathname === targetPath || !pendingPath) {
        // Wait 150ms to allow the new page components to mount and render behind the curtain
        const timer = setTimeout(() => {
          setState('animating-out')
        }, 150)
        return () => clearTimeout(timer)
      }
    }
  }, [state, pathname, pendingPath])

  // Handle stage 3: exit animation completes -> idle
  useEffect(() => {
    if (state === 'animating-out') {
      // Exit stagger is 2 * 0.1s + 0.55s = 0.75s
      // Wait 750ms for panels to slide out
      const timer = setTimeout(() => {
        setState('idle')
        setPendingPath(null)
      }, 750)

      return () => clearTimeout(timer)
    }
  }, [state])

  // Body scroll lock management
  // html { scrollbar-gutter: stable } in globals.css reserves the scrollbar slot permanently,
  // so locking/unlocking overflow causes zero layout shift.
  useEffect(() => {
    if (state === 'animating-in' || state === 'loading' || state === 'animating-out') {
      document.body.classList.remove('loaded')
    } else if (state === 'idle') {
      document.body.classList.add('loaded')
    }
  }, [state])


  return (
    <NavigationContext.Provider value={{ state, navigate }}>
      {children}
    </NavigationContext.Provider>
  )
}

const panels = [
  { id: 1, top: '0%' },
  { id: 2, top: 'calc(33.33% - 0.5px)' },
  { id: 3, top: 'calc(66.66% - 1px)' },
]

const panelVariants = {
  initial: {
    x: '-100%',
  },
  animate: (index: number) => ({
    x: 0,
    transition: {
      duration: 0.55,
      delay: index * 0.1,
      ease: [0.76, 0, 0.24, 1] as any,
    },
  }),
  exit: (index: number) => ({
    x: '100%',
    transition: {
      duration: 0.55,
      delay: index * 0.1,
      ease: [0.76, 0, 0.24, 1] as any,
    },
  }),
}

export default function PageTransition() {
  const { state } = useNavigation()
  
  // Show panels when transitioning in or loading
  const showPanels = state === 'animating-in' || state === 'loading'

  return (
    <AnimatePresence mode="wait">
      {showPanels && (
        <div className="fixed inset-0 pointer-events-none z-[9999] w-screen h-screen">
          {panels.map((panel, idx) => (
            <motion.div
              key={panel.id}
              custom={idx}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                top: panel.top,
                height: 'calc(33.33% + 2px)',
              }}
              className="fixed left-0 w-screen bg-gold-crayola will-change-transform pointer-events-auto"
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

