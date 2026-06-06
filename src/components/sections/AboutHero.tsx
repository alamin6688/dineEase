'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionSubtitle from '../SectionSubtitle'
import { fadeInUp, staggerContainer, scaleUp } from '@/utils/animations'

export default function AboutHero() {
  return (
    <section className="relative bg-smoky-black-1 pt-[140px] pb-[70px] lg:pt-[180px] lg:pb-[100px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
        {/* Top Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-[50px]"
        >
          <motion.div variants={fadeInUp}>
            <SectionSubtitle>Special moments</SectionSubtitle>
          </motion.div>
          <motion.h1 
            variants={fadeInUp} 
            className="font-forum text-headline-1 text-white uppercase tracking-ls-3 mt-[10px]"
          >
            About Us
          </motion.h1>
        </motion.div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] items-stretch">
          
          {/* Left Column: Traditional Thali Image */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleUp}
            className="relative h-[300px] lg:h-[450px] rounded-24 overflow-hidden border border-white-alpha-10 hover-shine"
          >
            <Image
              src="/assets/images/about-abs-image.jpg"
              alt="Traditional Indian Thali"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Middle Column: Dark Content Card */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-smoky-black-2 border border-white-alpha-10 rounded-24 p-[30px] sm:p-[40px] flex flex-col justify-center items-center text-center"
          >
            <span className="font-forum text-[1.8rem] text-gold-crayola italic tracking-ls-1 mb-[10px]">
              Taste perception
            </span>
            <h2 className="font-forum text-title-1 text-white uppercase tracking-ls-1 mb-[20px] leading-tight">
              Traditional <br className="hidden sm:inline" /> & Modern
            </h2>
            <p className="text-quick-silver text-body-2 leading-relaxed mb-[30px]">
              Where centuries-old culinary traditions meet the refined elegance of a modern Indian bistro. We invite you to experience the vibrant pulse of India.
            </p>
          
          </motion.div>

          {/* Right Column: Modern dining space */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleUp}
            className="relative h-[300px] lg:h-[450px] rounded-24 overflow-hidden border border-white-alpha-10 hover-shine"
          >
            <Image
              src="/assets/images/hero-slider-2.jpg"
              alt="Modern Restaurant Dining"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
