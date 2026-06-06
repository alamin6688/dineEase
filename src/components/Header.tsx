'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoCloseOutline } from 'react-icons/io5'
import Btn from './Btn'
import Separator from './Separator'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menus', href: '/#menu' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Chefs', href: '/#features' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const pathname = usePathname()

  const isHomepage = pathname === '/'
  // On /contact the navbar is always white
  const isContactPage = pathname === '/contact'
  // On /events the navbar is always dark
  const isEventsPage = pathname === '/events'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle Body Scroll lock when nav drawer is active
  useEffect(() => {
    document.body.classList.toggle('nav-active', navOpen)
  }, [navOpen])

  // ── Derived style tokens ────────────────────────────────────────────────
  // Contact page: always white, always top-0
  // Events page: always dark, always top-0
  // Landing page: transparent → dark on scroll
  const headerBg = isContactPage
    ? 'bg-white border-b border-[hsla(0,0%,0%,0.08)] shadow-[0_2px_16px_hsla(0,0%,0%,0.06)]'
    : isEventsPage || scrolled
      ? 'bg-eerie-black-4 border-b border-black-alpha-15 shadow-1'
      : 'bg-transparent border-b border-transparent'

  const headerTop = isHomepage ? (scrolled ? 'top-0' : 'top-0 sm:top-[40px]') : 'top-0'
  const headerPy  = isContactPage 
    ? 'py-[18px]' 
    : isEventsPage || scrolled 
      ? 'py-[20px]' 
      : 'py-[40px]'

  const linkColor   = isContactPage ? 'text-smoky-black-1 hover:text-gold-crayola' : 'text-white'
  const burgerColor = isContactPage ? 'bg-smoky-black-1' : 'bg-white'

  return (
    <>
      <header className={`fixed left-0 w-full z-[45] transition-all duration-2 ${headerTop} ${headerBg} ${headerPy}`}>
        <div className="px-6 md:px-10 flex justify-between items-center gap-[8px]">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/images/logo.png"
              alt="Spice Valley Logo"
              width={160}
              height={100}
              priority
              className="h-[40px] sm:h-[52px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-[30px]">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className={`hover-underline text-label-2 uppercase font-bold tracking-ls-1 leading-none py-[10px] block transition-colors ${linkColor}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-[8px]">
            <Btn href="/contact" className="hidden sm:block btn-nav">
              Book A Table
            </Btn>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setNavOpen(true)}
              className="xl:hidden flex flex-col justify-center items-end p-[12px] pr-0 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className={`w-[30px] h-[2px] my-[4px] block origin-left animate-menu-btn ${burgerColor}`} />
              <span className={`w-[30px] h-[2px] my-[4px] block origin-left animate-menu-btn [animation-delay:150ms] ${burgerColor}`} />
              <span className={`w-[30px] h-[2px] my-[4px] block origin-left animate-menu-btn [animation-delay:300ms] ${burgerColor}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      <div
        className={`fixed top-0 bottom-0 z-[60] w-full max-w-[360px] bg-smoky-black-1 px-[30px] pb-[50px] overflow-y-auto transition-all duration-2 flex flex-col ${
          navOpen ? 'left-0' : '-left-[360px] invisible'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setNavOpen(false)}
          className="text-white border border-current p-[4px] rounded-full ml-auto mt-[30px] mb-[20px] hover:text-gold-crayola transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <IoCloseOutline size={24} />
        </button>

        {/* Logo */}
        <Link href="/" onClick={() => setNavOpen(false)} className="mx-auto mb-[60px] flex-shrink-0">
          <Image
            src="/assets/images/logo.png"
            alt="Spice Valley Logo"
            width={160}
            height={100}
            className="h-[55px] w-auto object-contain"
          />
        </Link>

        {/* Drawer Menu List */}
        <nav className="border-b border-white-alpha-20 mb-[60px]">
          <ul>
            {navLinks.map((link, idx) => (
              <li key={idx} className="border-t border-white-alpha-20">
                <Link
                  href={link.href}
                  onClick={() => setNavOpen(false)}
                  className="group relative text-label-2 uppercase py-[15px] block font-bold tracking-ls-1"
                >
                  {/* Left Diamond Dot Indicator */}
                  <Separator className="absolute top-1/2 left-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="span inline-block transition-transform duration-1 group-hover:translate-x-[20px] group-hover:text-gold-crayola">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Info in Sidebar */}
        <div className="text-center font-dmSans text-[1.4rem]">
          <h3 className="font-forum text-title-3 uppercase tracking-ls-3 text-white mb-[15px]">
            Visit Us
          </h3>
          <p className="text-quick-silver my-[10px]">
            Restaurant St, Delicious City, <br /> London 9578, UK
          </p>

          <Separator className="my-[30px] mx-auto animate-rotate-slow" />

          <p className="font-bold text-white mb-[10px]">Booking Request</p>
          <a
            href="tel:+11234567890"
            className="text-gold-crayola hover:text-white transition-colors text-title-3 block font-forum"
          >
            +1 123 456 7890
          </a>
          <a
            href="mailto:booking@restaurant.com"
            className="text-quick-silver hover:text-gold-crayola transition-colors mt-[10px] block"
          >
            booking@restaurant.com
          </a>
        </div>
      </div>

      {/* Dark Overlay Backdrop behind sidebar */}
      <div
        onClick={() => setNavOpen(false)}
        className={`fixed inset-0 bg-black-alpha-80 z-[55] transition-opacity duration-2 ${
          navOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  )
}
