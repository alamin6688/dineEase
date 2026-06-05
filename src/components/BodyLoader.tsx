'use client'
import { useEffect } from 'react'
import { useNavigation } from './PageTransition'

/** 
 * Immediately adds the 'loaded' class to <body> on mount.
 * Needed on pages that don't have the full Preloader component
 * so that the body overflow-hidden reset from globals.css is lifted.
 */
export default function BodyLoader() {
  const { state } = useNavigation()

  useEffect(() => {
    if (state === 'idle') {
      document.body.classList.add('loaded')
    }
  }, [state])
  return null
}

