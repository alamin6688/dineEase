'use client'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition() {
  const pathname = usePathname()
  const prevPath = useRef<string | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Skip the very first paint — the Preloader on / already covers that
    if (prevPath.current === null) {
      prevPath.current = pathname
      return
    }

    if (prevPath.current !== pathname) {
      prevPath.current = pathname

      // Lock scroll while overlay is visible
      document.body.classList.remove('loaded')

      setShow(true)

      // Keep overlay visible for ~800ms then slide it away
      const t = setTimeout(() => {
        setShow(false)
        // Re-unlock scroll after exit animation finishes (~500ms)
        setTimeout(() => document.body.classList.add('loaded'), 500)
      }, 900)

      return () => clearTimeout(t)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-transition"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-gold-crayola flex flex-col items-center justify-center pointer-events-none"
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            {/* Spinner — same as initial Preloader */}
            <div className="w-[80px] h-[80px] rounded-full border-[3px] border-white border-t-smoky-black-3 animate-rotate-fast mb-[28px]" />

            {/* Animated brand text — same as initial Preloader */}
            <h2 className="text-[clamp(2rem,1.5rem+2.5vw,4rem)] font-bold uppercase tracking-[14px] pl-[14px] text-transparent bg-loading-gradient bg-[length:500%] bg-clip-text [-webkit-text-stroke:0.5px_hsla(0,3%,7%,1)] animate-loading-text leading-none font-dmSans">
              DineEase
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
