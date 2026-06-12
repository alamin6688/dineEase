'use client'
import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import BodyLoader from '@/components/BodyLoader'
import Btn from '@/components/Btn'
import { motion } from 'framer-motion'
import { 
  IoLocationOutline, 
  IoCallOutline, 
  IoTimeOutline, 
  IoNavigateOutline,
  IoAccessibilityOutline,
  IoTrainOutline
} from 'react-icons/io5'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function LocationPage() {
  return (
    <>
      <BodyLoader />
      <Header />

      <main className="bg-[#FAF9F6] pt-[140px] pb-[100px] lg:pt-[180px] lg:pb-[140px] min-h-screen text-smoky-black-1 font-dmSans">
        <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
          
          {/* SECTION 1: REACH US & OPENING HOURS */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-[40px] lg:gap-[60px] items-stretch mb-[80px] lg:mb-[120px]">
            
            {/* Left Box: Reach Us details column */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="bg-white border border-[hsla(0,0%,0%,0.06)] rounded-24 p-[24px] sm:p-[32px] md:p-[45px] shadow-[0_10px_40px_rgba(0,0%,0%,0.02)] flex flex-col justify-between h-full gap-[40px]"
            >
              <div>
                <motion.h1 
                  variants={fadeInUp}
                  className="font-forum text-headline-2 uppercase text-smoky-black-1 tracking-ls-1 mb-[35px]"
                >
                  Reach Us
                </motion.h1>

                <div className="flex flex-col gap-[30px] text-[1.4rem]">
                  {/* Address */}
                  <motion.div variants={fadeInUp} className="flex gap-[16px] items-start">
                    <div className="p-[10px] bg-[#FAF9F6] rounded-full text-gold-crayola border border-[hsla(0,0%,0%,0.06)] shrink-0">
                      <IoLocationOutline size={22} />
                    </div>
                    <div>
                      <span className="block text-[1.1rem] font-bold uppercase tracking-ls-1 text-quick-silver mb-[4px]">
                        ADDRESS
                      </span>
                      <p className="font-bold text-smoky-black-1 leading-snug">
                        171 Lee Lane, Horwich<br />
                        Bolton, BL6 7JD
                      </p>
                    </div>
                  </motion.div>

                  {/* Contact */}
                  <motion.div variants={fadeInUp} className="flex gap-[16px] items-start">
                    <div className="p-[10px] bg-[#FAF9F6] rounded-full text-gold-crayola border border-[hsla(0,0%,0%,0.06)] shrink-0">
                      <IoCallOutline size={22} />
                    </div>
                    <div>
                      <span className="block text-[1.1rem] font-bold uppercase tracking-ls-1 text-quick-silver mb-[4px]">
                        CONTACT
                      </span>
                      <a 
                        href="tel:+441204697222" 
                        className="block font-bold text-smoky-black-1 hover:text-gold-crayola transition-colors leading-none mb-[4px]"
                      >
                        +44 1204 697222
                      </a>
                      <a 
                        href="mailto:info@spicevalley.co.uk" 
                        className="block font-bold text-davys-grey hover:text-gold-crayola transition-colors leading-none"
                      >
                        info@spicevalley.co.uk
                      </a>
                    </div>
                  </motion.div>

                  {/* Weekly schedule */}
                  <motion.div variants={fadeInUp} className="flex gap-[16px] items-start">
                    <div className="p-[10px] bg-[#FAF9F6] rounded-full text-gold-crayola border border-[hsla(0,0%,0%,0.06)] shrink-0">
                      <IoTimeOutline size={22} />
                    </div>
                    <div>
                      <span className="block text-[1.1rem] font-bold uppercase tracking-ls-1 text-quick-silver mb-[4px]">
                        WEEKLY SCHEDULE
                      </span>
                      <p className="italic text-davys-grey leading-relaxed">
                        Reservations recommended for weekends.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Order/Book Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col gap-[12px] mt-auto">
                <Btn href="/menu" variant="secondary" className="w-full h-[54px] flex items-center justify-center font-bold">
                  Order Online
                </Btn>
                <Btn href="/reserve" className="w-full h-[54px] flex items-center justify-center font-bold">
                  Reserve A Table
                </Btn>
              </motion.div>
            </motion.div>

            {/* Right Box: Map Mockup Device + Opening Hours Grid */}
            <div className="flex flex-col gap-[35px] justify-between">
              
              {/* Google Maps device monitor mockup */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-[#151618] rounded-24 p-[12px] pb-[16px] md:p-[16px] md:pb-[24px] shadow-1 border border-white-alpha-10 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Monitor display wrapper */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#0D0B08] group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.472714578912!2d-2.585250423180479!3d53.59939527237016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b077a28e8d8cf%3A0x7d28711e7e456cf6!2s171%20Lee%20Lane%2C%20Horwich%2C%20Bolton%20BL6%207JD%2C%20UK!5e0!3m2!1sen!2sus!4v1717750000000!5m2!1sen!2sus"
                    className="absolute inset-0 w-full h-full border-0 pointer-events-auto filter grayscale opacity-90 group-hover:filter-none transition-all duration-700"
                    allowFullScreen={false}
                    loading="lazy"
                    title="Spice Valley Bolton Location Map"
                  />
                  
                  {/* Backdrop overlay */}
                  <div className="absolute inset-0 bg-[rgba(12,11,11,0.1)] pointer-events-none" />

                  {/* Get Directions badge bottom-right */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=nullnull&query_place_id=ChIJax7nR-Sme0gRWhW6U7PLQH8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-smoky-black-1 text-white hover:text-gold-crayola flex items-center gap-[10px] px-[20px] py-[12px] rounded-lg text-label-2 font-bold uppercase tracking-ls-1 transition-all shadow-md"
                  >
                    <IoNavigateOutline size={16} />
                    <span>Get Directions</span>
                  </a>
                </div>

                {/* Desktop Monitor Stand */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[90px] h-[6px] bg-[#333] rounded-t-md hidden md:block" />
              </motion.div>

              {/* Opening Hours list table */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="bg-white border border-[hsla(0,0%,0%,0.06)] rounded-24 p-[24px] sm:p-[32px] md:p-[45px] shadow-[0_10px_40px_rgba(0,0%,0%,0.02)]"
              >
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[hsla(0,0%,0%,0.06)] pb-[16px] mb-[25px] gap-2">
                  <h2 className="font-forum text-title-1 uppercase text-smoky-black-1 tracking-ls-1 font-bold">
                    Opening Hours
                  </h2>
                  <span className="text-[1.3rem] text-davys-grey italic">
                    Times may vary on public holidays
                  </span>
                </motion.div>

                {/* Hours rows list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px] lg:gap-x-[50px] gap-y-[12px] text-[1.4rem] font-bold">
                  
                  {/* Left Column (Mon-Thu) */}
                  <div className="flex flex-col gap-[12px]">
                    <motion.div variants={fadeInUp} className="flex justify-between border-b border-[hsla(0,0%,0%,0.04)] pb-[8px]">
                      <span className="text-davys-grey">MONDAY</span>
                      <span className="italic text-gold-crayola">Closed</span>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex justify-between border-b border-[hsla(0,0%,0%,0.04)] pb-[8px]">
                      <span className="text-davys-grey">TUESDAY</span>
                      <span className="text-smoky-black-1 font-mono">17:00 - 22:30</span>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex justify-between border-b border-[hsla(0,0%,0%,0.04)] pb-[8px]">
                      <span className="text-davys-grey">WEDNESDAY</span>
                      <span className="text-smoky-black-1 font-mono">17:00 - 22:30</span>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex justify-between">
                      <span className="text-davys-grey">THURSDAY</span>
                      <span className="text-smoky-black-1 font-mono">17:00 - 22:30</span>
                    </motion.div>
                  </div>

                  {/* Right Column (Fri-Sun) */}
                  <div className="flex flex-col gap-[12px] md:border-l md:border-[hsla(0,0%,0%,0.06)] md:pl-[30px] lg:pl-[50px]">
                    <motion.div variants={fadeInUp} className="flex justify-between border-b border-[hsla(0,0%,0%,0.04)] pb-[8px] items-start">
                      <span className="text-davys-grey">FRIDAY</span>
                      <div className="text-right flex flex-col items-end text-smoky-black-1 font-mono leading-tight">
                        <span>12:00 - 14:00</span>
                        <span>17:00 - 23:00</span>
                      </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex justify-between border-b border-[hsla(0,0%,0%,0.04)] pb-[8px]">
                      <span className="text-davys-grey">SATURDAY</span>
                      <span className="text-smoky-black-1 font-mono">15:00 - 23:00</span>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex justify-between">
                      <span className="text-davys-grey">SUNDAY</span>
                      <span className="text-smoky-black-1 font-mono">13:00 - 21:00</span>
                    </motion.div>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>

          {/* SECTION 2: ARRIVE IN STYLE */}
          <div className="border-t border-[hsla(0,0%,0%,0.06)] pt-[80px] lg:pt-[100px]">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-[50px]"
            >
              <motion.span 
                variants={fadeInUp}
                className="text-gold-crayola uppercase text-label-2 font-bold tracking-ls-3 block mb-[10px]"
              >
                EXPERIENCE
              </motion.span>
              <motion.h2 
                variants={fadeInUp}
                className="font-forum text-headline-2 uppercase text-smoky-black-1 tracking-ls-1"
              >
                Arrive in Style
              </motion.h2>
            </motion.div>

            {/* Travel card items */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-[25px]"
            >
              
              {/* Parking */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white border border-[hsla(0,0%,0%,0.06)] rounded-24 p-[24px] sm:p-[32px] md:p-[40px] text-center shadow-[0_10px_40px_rgba(0,0%,0%,0.01)] hover:shadow-md transition-shadow"
              >
                <div className="w-[54px] h-[54px] border border-[hsla(0,0%,0%,0.08)] rounded-xl flex items-center justify-center mx-auto mb-[25px] font-forum text-[2.4rem] font-bold text-smoky-black-1">
                  P
                </div>
                <h3 className="font-forum text-title-3 font-bold uppercase tracking-ls-1 text-smoky-black-1 mb-[15px]">
                  Parking
                </h3>
                <p className="text-body-2 text-davys-grey leading-relaxed">
                  Convenient on-street parking available directly outside the restaurant and in nearby public car parks.
                </p>
              </motion.div>

              {/* Accessibility */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white border border-[hsla(0,0%,0%,0.06)] rounded-24 p-[24px] sm:p-[32px] md:p-[40px] text-center shadow-[0_10px_40px_rgba(0,0%,0%,0.01)] hover:shadow-md transition-shadow"
              >
                <div className="w-[54px] h-[54px] border border-[hsla(0,0%,0%,0.08)] rounded-xl flex items-center justify-center mx-auto mb-[25px] text-smoky-black-1">
                  <IoAccessibilityOutline size={24} />
                </div>
                <h3 className="font-forum text-title-3 font-bold uppercase tracking-ls-1 text-smoky-black-1 mb-[15px]">
                  Accessibility
                </h3>
                <p className="text-body-2 text-davys-grey leading-relaxed">
                  Our restaurant features step-free entrance and accessible dining areas to ensure comfort for all guests.
                </p>
              </motion.div>

              {/* Public Transport */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white border border-[hsla(0,0%,0%,0.06)] rounded-24 p-[24px] sm:p-[32px] md:p-[40px] text-center shadow-[0_10px_40px_rgba(0,0%,0%,0.01)] hover:shadow-md transition-shadow"
              >
                <div className="w-[54px] h-[54px] border border-[hsla(0,0%,0%,0.08)] rounded-xl flex items-center justify-center mx-auto mb-[25px] text-smoky-black-1">
                  <IoTrainOutline size={24} />
                </div>
                <h3 className="font-forum text-title-3 font-bold uppercase tracking-ls-1 text-smoky-black-1 mb-[15px]">
                  Public Transport
                </h3>
                <p className="text-body-2 text-davys-grey leading-relaxed">
                  Located a short walk from Blackrod station and well-connected by local bus routes along Lee Lane.
                </p>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
