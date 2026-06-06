'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaLeaf, FaUtensils, FaWineGlassAlt, FaSmile } from 'react-icons/fa'
import { fadeInUp, staggerContainer, scaleUp } from '@/utils/animations'

const excellenceCards = [
  {
    icon: <FaLeaf className="text-[2.2rem] text-gold-crayola" />,
    title: 'Vegetarian & Vegan',
    desc: 'Extensive plant-based options crafted with locally sourced organic produce.',
  },
  {
    icon: <FaUtensils className="text-[2.2rem] text-gold-crayola" />,
    title: 'Small Plates',
    desc: 'Modern interpretations of traditional street food, perfect for sharing.',
  },
  {
    icon: <FaWineGlassAlt className="text-[2.2rem] text-gold-crayola" />,
    title: 'Wine & Dessert',
    desc: 'A curated list of global wines and decadent house-made desserts.',
  },
  {
    icon: <FaSmile className="text-[2.2rem] text-gold-crayola" />,
    title: "Kids' Menu",
    desc: 'Thoughtfully curated flavors for our younger guests in a family-friendly space.',
  },
]

export default function CulinaryExcellence() {
  return (
    <section id="culinary" className="relative bg-white text-smoky-black-1 py-[70px] lg:py-[100px] overflow-hidden scroll-mt-[90px]">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[50px] items-center">
        
        {/* Left Column: Heading, Paragraph, and 2x2 Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-forum text-headline-2 text-smoky-black-1 uppercase tracking-ls-1 mb-[20px] leading-tight"
          >
            Culinary Excellence
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-davys-grey text-body-2 leading-relaxed mb-[40px] max-w-[650px]"
          >
            Our menu is a celebration of India&apos;s diverse gastronomic landscape, prepared with organic ingredients and a modern perspective. From the sizzle of the tandoor to the delicate balance of our small plates, every dish tells a story.
          </motion.p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
            {excellenceCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-[#faf9f6] border border-neutral-100 rounded-24 p-[30px] flex flex-col justify-start items-start transition-all duration-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div className="mb-[15px] p-[12px] bg-white rounded-full border border-neutral-100 flex items-center justify-center shadow-sm">
                  {card.icon}
                </div>
                <h3 className="font-forum text-title-3 text-smoky-black-1 mb-[10px] tracking-ls-1 uppercase">
                  {card.title}
                </h3>
                <p className="text-davys-grey text-body-2 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Tall vertical food image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleUp}
          className="relative w-full aspect-[4/5] rounded-24 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-neutral-100 hover-shine"
        >
          <Image
            src="/assets/images/about-abs-image.jpg"
            alt="Delicious Indian Thali Dish"
            fill
            sizes="(max-width: 1024px) 100vw, 450px"
            className="object-cover"
          />
        </motion.div>

      </div>
    </section>
  )
}
