'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleUp } from '@/utils/animations'

const vibeDetails = [
  {
    category: 'THE VIBE',
    title: 'Casual, Romantic, and Trendy',
    desc: 'A versatile space perfect for a first date, a business lunch, or a family gathering.',
  },
  {
    category: 'CONNECTIVITY',
    title: 'Free Wi-Fi',
    desc: 'High-speed guest Wi-Fi throughout the restaurant for your convenience.',
  },
  {
    category: 'REFRESHMENTS',
    title: 'Bar on site',
    desc: 'A full-service bar featuring signature cocktails infused with Indian botanicals.',
  },
  {
    category: 'INCLUSIVITY',
    title: 'Family Friendly',
    desc: 'Special considerations for groups and families of all sizes.',
  },
]

export default function VibeAtmosphere() {
  return (
    <section id="vibe" className="relative bg-[#fbfbf9] text-smoky-black-1 py-[70px] lg:py-[100px] overflow-hidden scroll-mt-[90px]">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[50px] items-center">
        
        {/* Left Column: Heading & 2x2 Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-forum text-headline-2 text-smoky-black-1 uppercase tracking-ls-1 mb-[40px] leading-tight"
          >
            Vibe & Atmosphere
          </motion.h2>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[40px] gap-y-[35px]">
            {vibeDetails.map((detail, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="flex flex-col"
              >
                <span className="text-gold-crayola font-bold text-label-2 uppercase tracking-ls-2 mb-[8px] block">
                  {detail.category}
                </span>
                <h3 className="font-forum text-[2rem] font-bold text-smoky-black-1 mb-[8px] uppercase tracking-ls-1 leading-tight">
                  {detail.title}
                </h3>
                <p className="text-davys-grey text-body-2 leading-relaxed">
                  {detail.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Premium Bar Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleUp}
          className="relative w-full aspect-[4/4] sm:aspect-[4/3] lg:aspect-[4/4] rounded-24 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-neutral-100 hover-shine"
        >
          <Image
            src="/assets/images/bar-atmosphere.png"
            alt="Luxury Bar Atmosphere"
            fill
            sizes="(max-width: 1024px) 100vw, 450px"
            className="object-cover"
          />
        </motion.div>

      </div>
    </section>
  )
}
