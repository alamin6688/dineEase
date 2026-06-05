'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Separator from '../Separator'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function Testimonials() {
  return (
    <section 
      id="testimonials" 
      className="relative bg-[url('/assets/images/testimonial-bg.jpg')] bg-cover bg-center text-center pt-[70px] lg:pt-[100px] pb-[340px] overflow-hidden"
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black-alpha-80 -z-10" />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px] z-10 relative"
      >
        {/* Large Quote Symbol */}
        <motion.span 
          variants={fadeInUp}
          className="font-forum text-[7rem] leading-[0.7em] text-gold-crayola block select-none mb-[20px]"
        >
          &ldquo;
        </motion.span>

        {/* Testimonial Review Content */}
        <motion.p 
          variants={fadeInUp}
          className="font-forum text-headline-2 text-white max-w-[910px] mx-auto leading-relaxed"
        >
          I wanted to thank you for inviting me down for that amazing dinner the other night. The food was outstanding, the service was impeccable, and the ambiance was top notch. Everything was perfect!
        </motion.p>

        {/* Rotating separators row */}
        <motion.div 
          variants={fadeInUp}
          className="flex justify-center gap-[2px] mt-[40px] mb-[50px] select-none"
        >
          <Separator className="animate-rotate-slow" />
          <Separator className="animate-rotate-slow" />
          <Separator className="animate-rotate-slow" />
        </motion.div>

        {/* Avatar */}
        <motion.div 
          variants={fadeInUp}
          className="relative w-[100px] h-[100px] rounded-full overflow-hidden border border-white-alpha-20 mx-auto mb-[15px] shadow-1"
        >
          <Image
            src="/assets/images/testi-avatar.jpg"
            alt="Sam Jhonson customer"
            fill
            sizes="100px"
            className="object-cover"
          />
        </motion.div>

        {/* Reviewer Name */}
        <motion.h3 
          variants={fadeInUp}
          className="text-gold-crayola font-bold uppercase tracking-ls-3 text-label-1 font-dmSans leading-none"
        >
          Sam Jhonson
        </motion.h3>
      </motion.div>
    </section>
  )
}
