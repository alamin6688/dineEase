'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionSubtitle from '../SectionSubtitle'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const featureItems = [
  { icon: '/assets/images/features-icon-1.png', title: 'Hygienic Food', desc: 'Lorem Ipsum is simply dummy printing and typesetting.' },
  { icon: '/assets/images/features-icon-2.png', title: 'Fresh Environment', desc: 'Lorem Ipsum is simply dummy printing and typesetting.' },
  { icon: '/assets/images/features-icon-3.png', title: 'Skilled Chefs', desc: 'Lorem Ipsum is simply dummy printing and typesetting.' },
  { icon: '/assets/images/features-icon-4.png', title: 'Event & Party', desc: 'Lorem Ipsum is simply dummy printing and typesetting.' },
]

export default function Features() {
  return (
    <section 
      id="features" 
      className="relative bg-eerie-black-1 py-[70px] lg:py-[100px] overflow-visible z-[1] scroll-mt-[100px]"
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
            <SectionSubtitle>Why Choose Us</SectionSubtitle>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="font-forum text-headline-1 text-white uppercase tracking-ls-1 mt-[12px] mb-[16px]"
          >
            Our Strength
          </motion.h2>
        </motion.div>

        {/* Feature Cards Grid with motion */}
        <motion.ul 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[40px] xl:gap-[30px]"
        >
          {featureItems.map((item, idx) => {
            const isOdd = idx % 2 === 0
            return (
              <motion.li
                key={idx}
                variants={fadeInUp}
                className={`group flex flex-col items-center text-center p-[30px_20px_40px] rounded-24 border border-white-alpha-10 transition-all duration-300 ${
                  isOdd ? 'bg-eerie-black-3' : 'bg-smoky-black-3'
                } hover:shadow-1`}
              >
                {/* Icon wrapper with flip animation on hover */}
                <div className="relative w-[100px] h-[80px] mb-[25px] flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={80}
                    style={{ width: 'auto', height: 'auto' }}
                    className="transition-transform duration-500 group-hover:scale-[-1] group-hover:rotate-180"
                  />
                </div>

                {/* Card Title */}
                <h3 className="font-forum text-title-3 text-white uppercase mb-[15px] tracking-ls-1">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-quick-silver text-body-2 leading-relaxed max-w-[240px]">
                  {item.desc}
                </p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>

      {/* Decorative Floating Shapes (Visible above 1400px) */}
      <div className="hidden 2xl:block absolute -top-[100px] right-0 -z-10 animate-float pointer-events-none">
        <Image
          src="/assets/images/shape-7.png"
          alt="Decorative Shape"
          width={208}
          height={178}
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>

      <div className="hidden 2xl:block absolute bottom-[80px] left-0 -z-10 animate-float [animation-delay:3s] pointer-events-none">
        <Image
          src="/assets/images/shape-8.png"
          alt="Decorative Shape"
          width={120}
          height={115}
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </section>
  )
}
