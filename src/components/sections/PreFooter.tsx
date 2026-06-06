'use client'
import React from 'react'
import { IoArrowUpOutline, IoShareSocialOutline } from 'react-icons/io5'

export default function PreFooter() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleShare = async () => {
    const shareData = {
      title: 'DineEase — Spice Valley Events',
      text: 'Check out DineEase catering and event requests!',
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Event requests page link copied to clipboard!')
      }
    } catch (err) {
      console.warn('Share/copy action failed', err)
    }
  }

  return (
    <section className="bg-[#EFEFEF] text-black font-dmSans py-[60px] lg:py-[85px] border-t border-[hsla(0,0%,0%,0.04)] relative z-10">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.4fr] gap-[40px] items-start">
          
          {/* Column 1: Story Details */}
          <div className="flex flex-col items-start text-left">
            <h2 className="font-forum text-[3.2rem] text-smoky-black-1 uppercase tracking-ls-1 leading-none mb-1">
              Spice Valley
            </h2>
            <p className="text-[1.1rem] font-bold text-davys-grey tracking-ls-1 uppercase mb-[20px] mt-[4px]">
              Spice Valley Authentic Indian Restaurant
            </p>
            <p className="text-[1.4rem] text-davys-grey leading-relaxed mb-[20px] max-w-[480px]">
              We truly believe Spice Valley Restaurants offers one of the finest eastern dining experiences that the Northwest has to offer. We have brought in chefs from some of the best hotels in India & Mauritius to produce an authentic Indian cuisine concept.
            </p>
            <a 
              href="/#about" 
              className="text-[1.2rem] font-bold uppercase tracking-ls-3 text-gold-crayola hover:text-black transition-colors underline underline-offset-4"
            >
              More About Our Story
            </a>
          </div>

          {/* Column 2: Address */}
          <div className="text-left">
            <h3 className="text-[1.2rem] font-bold uppercase tracking-ls-3 text-davys-grey border-b border-[hsla(0,0%,0%,0.15)] pb-[8px] mb-[20px]">
              Address
            </h3>
            <address className="text-[1.5rem] text-davys-grey not-italic leading-relaxed flex flex-col gap-1">
              <span>171 Lee Lane</span>
              <span>BL6 7JD Horwich</span>
            </address>
          </div>

          {/* Column 3: Contact */}
          <div className="text-left">
            <h3 className="text-[1.2rem] font-bold uppercase tracking-ls-3 text-davys-grey border-b border-[hsla(0,0%,0%,0.15)] pb-[8px] mb-[20px]">
              Contact
            </h3>
            <div className="text-[1.5rem] text-davys-grey leading-relaxed flex flex-col gap-2">
              <a 
                href="tel:+441204697222" 
                className="hover:text-gold-crayola transition-colors"
              >
                +44 1204 697222
              </a>
              <a 
                href="mailto:events@spicevalley.com" 
                className="hover:text-gold-crayola transition-colors"
              >
                events@spicevalley.com
              </a>
            </div>
          </div>

          {/* Column 4: Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col justify-start lg:justify-center items-center lg:items-end gap-[15px] pt-4 lg:pt-0">


            {/* Share Page Link */}
            <button
              onClick={handleShare}
              aria-label="Share page"
              className="bg-white border border-[hsla(0,0%,0%,0.1)] rounded-xl w-[56px] h-[56px] flex justify-center items-center shadow-sm hover:bg-gold-crayola hover:text-white hover:border-gold-crayola transition-all cursor-pointer group"
            >
              <IoShareSocialOutline size={20} className="text-davys-grey group-hover:text-white transition-colors" />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
