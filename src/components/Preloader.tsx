'use client'
import React, { useEffect, useState } from 'react'

export default function Preloader() {
  const [loaded, setLoaded] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      setLoaded(true)
      const timer = setTimeout(() => {
        setHidden(true)
        document.body.classList.add('loaded')
      }, 500)
      return () => clearTimeout(timer)
    }

    // Check if the page is already fully loaded
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      // Fallback timer to ensure the preloader disappears eventually
      const fallbackTimer = setTimeout(handleLoad, 2000)
      return () => {
        window.removeEventListener('load', handleLoad)
        clearTimeout(fallbackTimer)
      }
    }
  }, [])

  if (hidden) return null

  return (
    <div
      className={`fixed inset-0 bg-gold-crayola z-[9999] flex flex-col items-center justify-center transition-all duration-[500ms] ease-out ${
        loaded ? 'opacity-0 translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      <div
        className={`flex flex-col items-center transition-opacity duration-[250ms] ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Spinner */}
        <div className="w-[112px] h-[112px] rounded-full border-[3px] border-white border-t-smoky-black-3 animate-rotate-fast mb-[45px]" />
        
        {/* Animated Text */}
        <h2 className="text-[clamp(2.5rem,2rem+3vw,5.5rem)] font-bold uppercase tracking-[16px] pl-[16px] text-transparent bg-loading-gradient bg-[length:500%] bg-clip-text [-webkit-text-stroke:0.5px_hsla(0,3%,7%,1)] animate-loading-text leading-none font-dmSans">
          DineEase
        </h2>
      </div>
    </div>
  )
}
