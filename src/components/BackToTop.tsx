'use client'
import React, { useEffect, useState } from 'react'
import { IoChevronUp } from 'react-icons/io5'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY >= 50)
    }
    // Set initial
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[20px] right-[20px] z-[45] w-[50px] h-[50px] rounded-full bg-gold-crayola text-smoky-black-1 flex items-center justify-center shadow-1 border-none outline-none transition-all duration-2 hover:bg-white hover:text-gold-crayola ${
        visible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
      }`}
      aria-label="Back to top"
    >
      <IoChevronUp size={24} className="stroke-[30px]" />
    </button>
  )
}
