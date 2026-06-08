'use client'
import React, { useEffect, useState } from 'react'
import { IoLocationOutline, IoTimeOutline, IoCallOutline, IoMailOutline } from 'react-icons/io5'
import Separator from './Separator'

export default function Topbar() {
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 50)
    }
    // Set initial state
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[50] bg-smoky-black-3 border-b border-white-alpha-20 py-[10px] transition-all duration-2  hidden sm:block ${
        sticky ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      style={{ height: '40px' }}
    >
      <div className="px-6 md:px-10 flex items-center justify-between lg:justify-center gap-[30px] font-dmSans text-[1.2rem] text-quick-silver h-full">
        {/* Address */}
        <div className="items-center gap-[6px] hidden lg:flex">
          <IoLocationOutline className="text-gold-crayola text-[1.4rem] flex-shrink-0" />
          <span className="leading-none text-label-1">171 Lee Lane, Horwich, Bolton, BL6 7JD</span>
        </div>

        {/* Working Hours */}
        <div className="items-center gap-[6px] hidden lg:flex mr-auto">
          <IoTimeOutline className="text-gold-crayola text-[1.4rem] flex-shrink-0" />
          <span className="leading-none text-label-1">Tue - Sun : 12:00 - 23:00</span>
        </div>

        {/* Phone Call */}
        <div className="flex items-center gap-[6px]">
          <IoCallOutline className="text-gold-crayola text-[1.4rem] flex-shrink-0" />
          <a href="tel:+441204697222" className="hover:text-gold-crayola transition-colors leading-none text-label-1">
            +44 1204 697222
          </a>
        </div>

        <Separator className="hidden xl:block" />

        {/* Email Booking */}
        <div className="flex items-center gap-[6px]">
          <IoMailOutline className="text-gold-crayola text-[1.4rem] flex-shrink-0" />
          <a href="mailto:info@spicevalley.co.uk" className="hover:text-gold-crayola transition-colors leading-none text-label-1">
            info@spicevalley.co.uk
          </a>
        </div>
      </div>
    </div>
  )
}
