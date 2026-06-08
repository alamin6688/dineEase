'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionSubtitle from '../SectionSubtitle'
import Btn from '../Btn'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const eventItems = [
  { 
    img: '/assets/images/event-1.jpg', 
    date: '15/09/2026', 
    category: 'Food, Flavour', 
    title: "Flavour so good you'll try to eat with your eyes." 
  },
  { 
    img: '/assets/images/event-2.jpg', 
    date: '08/09/2026', 
    category: 'Healthy Food', 
    title: "Flavour so good you'll try to eat with your eyes." 
  },
  { 
    img: '/assets/images/event-3.jpg', 
    date: '03/09/2026', 
    category: 'Recipe', 
    title: "Flavour so good you'll try to eat with your eyes." 
  },
]

export default function Event() {
  return (
    <section 
      id="event" 
      className="relative bg-smoky-black-2 py-[70px] lg:py-[100px] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
        {/* Section Header with stagger */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-[40px] xl:mb-[60px]"
        >
          <motion.div variants={fadeInUp}>
            <SectionSubtitle>Recent Updates</SectionSubtitle>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="font-forum text-headline-1 text-white uppercase tracking-ls-1 mt-[12px] mb-[16px]"
          >
            Upcoming Event
          </motion.h2>
        </motion.div>

        {/* Events Grid with motion stagger */}
        <motion.ul 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] xl:gap-[30px] mb-[55px]"
        >
          {eventItems.map((item, idx) => (
            <motion.li
              key={idx}
              variants={fadeInUp}
              className={`relative overflow-hidden hover-shine rounded-24 border border-white-alpha-10 aspect-[350/450] group cursor-pointer bg-eerie-black-4 ${
                idx === 2 
                  ? 'md:col-span-2 md:w-[calc(50%-20px)] md:mx-auto lg:col-span-1 lg:w-full' 
                  : ''
              }`}
            >
              {/* Event Image with zoom effect */}
              <div className="relative w-full h-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover transition-transform duration-2 group-hover:scale-105"
                />
              </div>

              {/* Date Badge (Absolute Top Left) */}
              <div className="absolute top-[30px] left-[30px] bg-smoky-black-3 text-gold-crayola px-[15px] py-[8px] font-forum text-[1.4rem] tracking-ls-3 leading-none z-10 border border-white-alpha-10">
                {item.date}
              </div>

              {/* Text Info Overlay (Absolute Bottom) */}
              <div className="absolute bottom-0 left-0 right-0 p-[30px] pt-[80px] bg-gradient-1 flex flex-col items-start text-left z-10">
                {/* Category Label */}
                <span className="text-gold-crayola uppercase text-label-2 font-bold tracking-ls-2 mb-[10px]">
                  {item.category}
                </span>

                {/* Event Title */}
                <h3 className="font-forum text-title-2 text-white uppercase group-hover:text-gold-crayola transition-colors leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* View Our Blog Button with fade-in */}
        {/* <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeInUp}>
            <Btn href="#reservation">View Our Blog</Btn>
          </motion.div>
        </motion.div> */}

      </div>
    </section>
  )
}
