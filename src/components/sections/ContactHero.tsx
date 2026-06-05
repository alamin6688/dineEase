'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function ContactHero() {
  return (
    <section className="relative min-h-[480px] flex items-center overflow-hidden bg-eerie-black-1">

      {/* Dark map background via embedded iframe with overlay */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-79.4%2C43.63%2C-79.33%2C43.69&layer=mapnik&marker=43.66%2C-79.38"
          className="w-full h-full border-0"
          title="Location Map"
          loading="lazy"
        />
        {/* dark teal overlay to match the design */}
        <div className="absolute inset-0 bg-[hsla(195,30%,8%,0.82)]" />
      </div>

      {/* Content — pt-[100px] clears the ~80px white sticky header */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-[20px] pt-[100px] pb-[80px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-[480px]"
        >
          {/* Label */}
          <motion.div variants={fadeInUp} className="flex items-center gap-[12px] mb-[16px]">
            <span className="block w-[30px] h-[2px] bg-gold-crayola" />
            <span className="text-gold-crayola font-bold text-label-2 uppercase tracking-ls-2">
              Contact
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="font-forum text-headline-1 text-white uppercase tracking-ls-1 leading-[1.1] mb-[18px]"
          >
            Contact
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-body-2 text-quick-silver leading-relaxed mb-[30px] max-w-[360px]"
          >
            Quaerat debitis, vel, sapiente dicta sequi labore porro pariatur harum expedita.
          </motion.p>

          {/* Breadcrumb */}
          <motion.div variants={fadeInUp} className="flex items-center gap-[6px]">
            <Link
              href="/"
              className="text-label-2 font-bold uppercase tracking-ls-3 text-white hover:text-gold-crayola transition-colors"
            >
              Home
            </Link>
            <span className="text-quick-silver text-label-2">›</span>
            <span className="text-label-2 font-bold uppercase tracking-ls-3 text-gold-crayola">
              Contact
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator dot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-[44px] h-[44px] rounded-full bg-white border-[4px] border-[hsla(0,0%,90%,1)] flex items-center justify-center shadow-md">
        <div className="w-[6px] h-[6px] rounded-full bg-gold-crayola" />
      </div>
    </section>
  )
}
