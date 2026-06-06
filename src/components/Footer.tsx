'use client'
import React from 'react'
import Image from 'next/image'
import Separator from './Separator'
import Btn from './Btn'

export default function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscribe logic
  }

  return (
    <footer
      className="bg-[url('/assets/images/footer-bg.jpg')] bg-cover bg-center pt-[80px] lg:pt-[100px] pb-[30px] z-1 font-dmSans text-[1.6rem] relative"
    >
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_1fr_0.45fr] gap-[40px] lg:gap-[60px] items-center mb-[80px]">
          
          {/* Left Column: Navigation Links */}
          <ul className="flex flex-col gap-[20px] text-center lg:text-left order-2 lg:order-1">
            <li>
              <a href="#home" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                Home
              </a>
            </li>
            <li>
              <a href="#menu" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                Menus
              </a>
            </li>
            <li>
              <a href="#about" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                About Us
              </a>
            </li>
            <li>
              <a href="#features" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                Our Chefs
              </a>
            </li>
            <li>
              <a href="#reservation" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                Contact
              </a>
            </li>
          </ul>

          {/* Center Column: Footer Brand Box */}
          <div className="relative bg-smoky-black-1 bg-[url('/assets/images/footer-form-bg.png')] bg-repeat text-center py-[50px] lg:py-[100px] px-[25px] sm:px-[40px] z-[1] shadow-1 order-1 lg:order-2">
            {/* SVG edge patterns */}
            <div className="absolute top-0 bottom-0 left-0 w-[15px] bg-[url('/assets/images/footer-form-pattern.svg')] bg-repeat-y bg-left pointer-events-none bg-contain" />
            <div className="absolute top-0 bottom-0 right-0 w-[15px] bg-[url('/assets/images/footer-form-pattern.svg')] bg-repeat-y bg-right pointer-events-none bg-contain scale-x-[-1]" />

            {/* Brand Logo */}
            <div className="flex justify-center mb-[40px]">
              <Image
                src="/assets/images/logo.png"
                alt="Spice Valley Logo"
                width={160}
                height={100}
                className="h-[65px] w-auto object-contain mx-auto"
              />
            </div>

            {/* Contact Info */}
            <address className="text-quick-silver text-body-2 not-italic mb-[20px]">
              Restaurant St, Delicious City, London 9578, UK
            </address>

            <a
              href="mailto:booking@spicevalley.com"
              className="text-quick-silver hover:text-gold-crayola transition-colors text-body-2 block mb-[10px]"
            >
              booking@spicevalley.com
            </a>

            <a
              href="tel:+88123123456"
              className="text-quick-silver hover:text-gold-crayola transition-colors text-body-2 block mb-[20px]"
            >
              Booking Request : +88-123-123456
            </a>

            <p className="text-quick-silver text-body-2 mb-[30px]">
              Open : 09:00 am - 01:00 pm
            </p>

            {/* Rotating Separator */}
            <div className="flex justify-center gap-[2px] mb-[40px] select-none">
              <Separator className="animate-rotate-slow" />
              <Separator className="animate-rotate-slow" />
              <Separator className="animate-rotate-slow" />
            </div>

            {/* News and subscribe */}
            <h3 className="font-forum text-title-1 uppercase tracking-ls-3 text-white mb-[10px] leading-tight">
              Get News & Offers
            </h3>
            <p className="text-label-1 text-quick-silver uppercase tracking-ls-1 mb-[30px]">
              Subscribe us & Get <strong className="text-white font-bold">25% Off.</strong>
            </p>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="relative w-full max-w-[460px] mx-auto">
              <div className="relative flex flex-col sm:block">
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="input-field w-full pr-0 sm:pr-[205px] mb-[20px] sm:mb-0 text-[1.4rem]"
                />
                <Btn type="submit" variant="secondary" className="sm:absolute sm:top-0 sm:right-0 sm:bottom-0 w-full sm:w-auto h-[56px] flex items-center justify-center">
                  Subscribe
                </Btn>
              </div>
            </form>
          </div>

          {/* Right Column: Social Links */}
          <ul className="flex flex-col gap-[20px] text-center lg:text-right order-3">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                Youtube
              </a>
            </li>
            <li>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-quick-silver hover:text-gold-crayola transition-colors uppercase font-bold tracking-ls-4 text-[1.4rem]">
                Google Map
              </a>
            </li>
          </ul>

        </div>

        {/* Footer Bottom copyright */}
        <div className="border-t border-white-alpha-10 pt-[30px] text-center text-quick-silver text-[1.4rem] font-dmSans">
          <p>
            &copy; 2022 Spice Valley. All Rights Reserved | Crafted by{' '}
            <a
              href="https://github.com/codewithsadee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-crayola hover-underline inline-block"
            >
              codewithsadee
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
