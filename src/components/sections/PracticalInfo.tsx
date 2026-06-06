'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaRegCreditCard, FaUsers } from 'react-icons/fa'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const practicalCards = [
  {
    icon: <span className="font-forum text-[3.2rem] font-bold text-gold-crayola leading-none select-none">P</span>,
    title: 'Parking',
    desc: 'Free street parking, free private lot, and nearby paid parking facilities available.',
  },
  {
    icon: <FaRegCreditCard className="text-[3rem] text-gold-crayola" />,
    title: 'Payments',
    desc: 'We accept all major Credit/Debit cards and NFC mobile payments (Apple/Google Pay).',
  },
  {
    icon: <FaUsers className="text-[3rem] text-gold-crayola" />,
    title: 'Crowd',
    desc: 'Welcoming groups, family-friendly atmosphere, and vibrant community space.',
  },
]

export default function PracticalInfo() {
  return (
    <section id="practical-info" className="relative bg-[#f8f8f8] text-smoky-black-1 py-[70px] lg:py-[100px] overflow-hidden scroll-mt-[90px]">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
        
        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-[50px]"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-forum text-headline-2 text-smoky-black-1 uppercase tracking-ls-1"
          >
            Practical Info
          </motion.h2>
        </motion.div>

        {/* 3-Card Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-[30px] max-w-[1100px] mx-auto"
        >
          {practicalCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white border border-neutral-100 rounded-24 p-[35px] sm:p-[45px] flex flex-col items-center justify-center text-center transition-all duration-2 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-[20px] h-[50px] flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="font-forum text-title-3 text-smoky-black-1 mb-[15px] tracking-ls-1 uppercase">
                {card.title}
              </h3>
              <p className="text-davys-grey text-body-2 leading-relaxed max-w-[280px]">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
