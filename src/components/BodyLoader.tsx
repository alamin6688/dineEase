'use client'
import { useEffect } from 'react'

/** 
 * Immediately adds the 'loaded' class to <body> on mount.
 * Needed on pages that don't have the full Preloader component
 * so that the body overflow-hidden reset from globals.css is lifted.
 */
export default function BodyLoader() {
  useEffect(() => {
    document.body.classList.add('loaded')
  }, [])
  return null
}
