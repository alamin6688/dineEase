'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaRegClock, FaConciergeBell, FaRegCalendarAlt } from 'react-icons/fa'
import { fadeInUp, staggerContainer, scaleUp } from '@/utils/animations'

const hospitalityList = [
  {
    icon: <FaRegClock className="text-[2.2rem] text-gold-crayola flex-shrink-0" />,
    title: 'Brunch, Lunch & Dinner',
    desc: 'Serving you throughout the day with distinct menus for every occasion.',
  },
  {
    icon: <FaConciergeBell className="text-[2.2rem] text-gold-crayola flex-shrink-0" />,
    title: 'Premier Table Service',
    desc: 'Attentive, Michelin-standard service tailored to your personal preferences.',
  },
  {
    icon: <FaRegCalendarAlt className="text-[2.2rem] text-gold-crayola flex-shrink-0" />,
    title: 'Full-Service Catering',
    desc: 'Bring the Spice Valley experience to your private events and celebrations.',
  },
]

export default function HospitalityService() {
  return (
    <section id="hospitality" className="relative bg-[#fbfbf9] text-smoky-black-1 py-[70px] lg:py-[100px] overflow-hidden scroll-mt-[90px]">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[50px] items-center">
        
        {/* Left Column: Double Offset Images */}
        <div className="flex items-center gap-[20px] sm:gap-[30px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleUp}
            className="relative w-1/2 aspect-[4/5] rounded-24 overflow-hidden border border-neutral-200 shadow-md hover-shine translate-y-[20px]"
          >
            <Image
              src="/assets/images/service-3.jpg"
              alt="Pouring Wine Hospitality"
              fill
              sizes="(max-width: 1024px) 50vw, 300px"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleUp}
            className="relative w-1/2 aspect-[4/5] rounded-24 overflow-hidden border border-neutral-200 shadow-md hover-shine -translate-y-[20px]"
          >
            <Image
              src="/assets/images/about-banner.jpg"
              alt="Set Dining Table"
              fill
              sizes="(max-width: 1024px) 50vw, 300px"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Right Column: Title, Subtitle, Info List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col pl-0 lg:pl-[30px]"
        >
          <motion.span
            variants={fadeInUp}
            className="font-forum text-[1.8rem] text-gold-crayola italic tracking-ls-1 mb-[10px]"
          >
            Experience Excellence
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-forum text-headline-2 text-smoky-black-1 uppercase tracking-ls-1 mb-[35px] leading-tight"
          >
            Hospitality & Service
          </motion.h2>

          {/* List items */}
          <div className="flex flex-col gap-[30px] mb-[35px]">
            {hospitalityList.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="flex items-start gap-[20px]"
              >
                <div className="p-[12px] bg-white rounded-full border border-neutral-100 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-forum text-title-3 text-smoky-black-1 mb-[5px] tracking-ls-1 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-davys-grey text-body-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeInUp}
            className="text-davys-grey font-forum text-[1.5rem] italic tracking-ls-1"
          >
            * We recommend and accept reservations for all meal services.
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}
