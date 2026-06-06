'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaMotorcycle, 
  FaShoppingBag, 
  FaUtensils, 
  FaWheelchair, 
  FaParking, 
  FaChair, 
  FaRestroom, 
  FaEye 
} from 'react-icons/fa'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const serviceHighlights = [
  { icon: <FaMotorcycle className="text-[3rem] text-gold-crayola mb-[10px]" />, label: 'Delivery' },
  { icon: <FaShoppingBag className="text-[3rem] text-gold-crayola mb-[10px]" />, label: 'Takeaway' },
  { icon: <FaUtensils className="text-[3rem] text-gold-crayola mb-[10px]" />, label: 'Dine-In' },
]

const accessibilityFeatures = [
  { icon: <FaWheelchair className="text-[2.6rem] text-smoky-black-1 mb-[12px]" />, label: 'Wheelchair Entrance' },
  { icon: <FaParking className="text-[2.6rem] text-smoky-black-1 mb-[12px]" />, label: 'Accessible Parking' },
  { icon: <FaChair className="text-[2.6rem] text-smoky-black-1 mb-[12px]" />, label: 'Accessible Seating' },
  { icon: <FaRestroom className="text-[2.6rem] text-smoky-black-1 mb-[12px]" />, label: 'Accessible Toilet' },
  { icon: <FaEye className="text-[2.6rem] text-smoky-black-1 mb-[12px]" />, label: 'Braille Menu' },
]

export default function InclusionAccessibility() {
  return (
    <section id="accessibility" className="relative bg-white text-smoky-black-1 py-[70px] lg:py-[100px] overflow-hidden scroll-mt-[90px]">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
        
        {/* Top: Services Row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="flex justify-around items-center max-w-[800px] mx-auto mb-[50px] border-b border-neutral-100 pb-[40px]"
        >
          {serviceHighlights.map((service, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="flex flex-col items-center text-center group"
            >
              <div className="transition-transform duration-2 group-hover:scale-110">
                {service.icon}
              </div>
              <span className="font-forum text-title-3 text-smoky-black-1 uppercase tracking-ls-1">
                {service.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Center: Title & Description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-[50px]"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-forum text-headline-2 text-smoky-black-1 uppercase tracking-ls-1 mb-[15px]"
          >
            Inclusive & Accessible
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-davys-grey text-body-2 max-w-[650px] mx-auto leading-relaxed"
          >
            We are committed to providing a welcoming and accessible environment for all our guests.
          </motion.p>
        </motion.div>

        {/* Bottom: Grid of 5 Accessibility Feature Boxes */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-5 gap-[20px]"
        >
          {accessibilityFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-[#f8f8f8] hover:bg-[#f3f3f3] border border-neutral-100 rounded-24 p-[25px] flex flex-col items-center justify-center text-center transition-all duration-2 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-[8px] flex items-center justify-center">
                {feature.icon}
              </div>
              <span className="font-bold text-label-2 text-smoky-black-1 uppercase tracking-ls-1 leading-tight">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
