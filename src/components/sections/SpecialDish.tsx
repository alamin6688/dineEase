'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionSubtitle from '../SectionSubtitle'
import Btn from '../Btn'
import { fadeInUp, slideInLeft, staggerContainer } from '@/utils/animations'

export default function SpecialDish() {
  return (
    <section 
      id="special-dish" 
      className="relative grid grid-cols-1 lg:grid-cols-2 bg-smoky-black-2 overflow-visible"
    >
      {/* Left Column: Full-Height Image with scroll animation */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={slideInLeft}
        className="relative min-h-[350px] sm:min-h-[500px] lg:min-h-[600px] xl:min-h-[900px] w-full border-b lg:border-b-0 lg:border-r border-white-alpha-10"
      >
        <Image
          src="/assets/images/special-dish-banner.jpg"
          alt="Lobster Tortellini Special Dish"
          fill
          sizes="(max-width: 992px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>

      {/* Right Column: Featured Dish Info with stagger animation */}
      <div className="special-dish-content flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-[70px] px-[20px] sm:px-[40px] lg:py-[100px] lg:px-[50px_25px] xl:py-[225px] xl:px-[120px_0px]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative w-full max-w-[460px] mx-auto lg:mx-0"
        >
          
          {/* Floating Badge (Above title at desktop) */}
          <div className="hidden lg:block absolute -top-[60px] -left-[40px] animate-float">
            <Image
              src="/assets/images/badge-1.png"
              alt="Special Badge"
              width={28}
              height={41}
            />
          </div>

          {/* Section Headers */}
          <motion.div variants={fadeInUp}>
            <SectionSubtitle align="left" className="mb-[15px] lg:items-start text-center lg:text-left">
              Special Dish
            </SectionSubtitle>
          </motion.div>

          <motion.h2 
            variants={fadeInUp}
            className="font-forum text-headline-2 text-white uppercase tracking-ls-1 mt-[10px] mb-[20px] leading-tight"
          >
            Lobster Tortellini
          </motion.h2>

          <motion.p 
            variants={fadeInUp}
            className="text-quick-silver text-body-2 leading-relaxed mb-[30px]"
          >
            Plump lobster-filled pasta tortellini tossed in a rich, buttery saffron reduction sauce, garnished with fresh micro-greens and shaved truffles. A culinary masterpiece crafted for the finest tastes.
          </motion.p>

          {/* Price Tag Row */}
          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-center lg:justify-start gap-[20px] font-forum text-white mb-[40px]"
          >
            <del className="text-davys-grey text-title-3 select-none">$40.00</del>
            <span className="text-gold-crayola text-title-1 font-bold">$20.00</span>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Btn href="/menu">View All Menu</Btn>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Floating Shapes (Visible above 1400px) */}
      <div className="hidden 2xl:block absolute top-[45%] right-0 -z-10 animate-float pointer-events-none">
        <Image
          src="/assets/images/shape-4.png"
          alt="Decorative Shape"
          width={179}
          height={359}
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>

      <div className="hidden 2xl:block absolute bottom-0 right-0 translate-y-1/2 -z-10 animate-float [animation-delay:2s] pointer-events-none">
        <Image
          src="/assets/images/shape-9.png"
          alt="Decorative Shape"
          width={351}
          height={462}
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </section>
  )
}
