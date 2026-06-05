'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionSubtitle from '../SectionSubtitle'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const serviceItems = [
  { title: 'Breakfast', img: '/assets/images/service-1.jpg', href: '#menu' },
  { title: 'Appetizers', img: '/assets/images/service-2.jpg', href: '#menu' },
  { title: 'Drinks', img: '/assets/images/service-3.jpg', href: '#menu' },
]

export default function Service() {
  return (
    <section 
      id="service" 
      className="relative bg-smoky-black-2 py-[70px] lg:py-[100px] xl:pt-[220px] xl:pb-[100px] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
        {/* Section Header with stagger animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-[40px] xl:mb-[75px]"
        >
          <motion.div variants={fadeInUp}>
            <SectionSubtitle>Flavors For Royalty</SectionSubtitle>
          </motion.div>
          <motion.h2 
            variants={fadeInUp} 
            className="font-forum text-headline-1 text-white uppercase tracking-ls-1 mt-[12px] mb-[16px]"
          >
            We Offer Top Notch
          </motion.h2>
          <motion.p 
            variants={fadeInUp} 
            className="text-quick-silver text-body-2 max-w-[420px] mx-auto leading-relaxed"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text.
          </motion.p>
        </motion.div>

        {/* Card Grid with stagger animation */}
        <motion.ul 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] xl:gap-[150px]"
        >
          {serviceItems.map((item, idx) => {
            const isOdd = idx % 2 === 0
            return (
              <motion.li
                key={idx}
                variants={fadeInUp}
                className={`service-card group text-center flex flex-col items-center ${
                  idx === 2 
                    ? 'md:col-span-2 md:w-[calc(50%-20px)] md:mx-auto lg:col-span-1 lg:w-full' 
                    : ''
                } ${
                  isOdd ? 'xl:-translate-y-[160px]' : ''
                } transition-transform duration-500`}
              >
                {/* Image Wrapper */}
                <div className="relative pattern-strip hover-shine w-full max-w-[285px] aspect-[285/336] overflow-hidden mb-[26px] py-[30px] z-[1]">
                  <Link href={item.href} className="block w-full h-full relative overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 285px"
                      className="object-cover transition-transform duration-2 group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Card Title & Link */}
                <h3 className="font-forum text-title-4 text-white mb-[12px] tracking-ls-1 uppercase">
                  <Link href={item.href} className="hover:text-gold-crayola transition-colors">
                    {item.title}
                  </Link>
                </h3>

                <Link 
                  href={item.href} 
                  className="text-gold-crayola font-bold uppercase tracking-ls-3 text-label-2 pb-[4px] border-b border-transparent hover:text-white hover:border-white transition-all duration-250 select-none"
                >
                  View Menu
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>

      {/* Decorative Floating Shapes */}
      <div className="hidden lg:block absolute bottom-0 left-0 -z-10 animate-float">
        <Image
          src="/assets/images/shape-1.png"
          alt="Decorative Shape"
          width={246}
          height={412}
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>

      <div className="hidden lg:block absolute top-0 right-0 -z-10 animate-float [animation-delay:1.5s]">
        <Image
          src="/assets/images/shape-2.png"
          alt="Decorative Shape"
          width={343}
          height={345}
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </section>
  )
}
