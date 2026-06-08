'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionSubtitle from '../SectionSubtitle'
import Btn from '../Btn'
import { fadeInUp, staggerContainerFast } from '@/utils/animations'

const menuItems = [
  { 
    name: 'Greek Salad', 
    img: '/assets/images/menu-1.png', 
    badge: 'Seasonal', 
    price: '$25.50', 
    desc: 'Tomatoes, green bell pepper, sliced cucumber onion, olives, and feta cheese.' 
  },
  { 
    name: 'Lasagne', 
    img: '/assets/images/menu-2.png', 
    badge: null, 
    price: '$40.00', 
    desc: 'Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.' 
  },
  { 
    name: 'Butternut Pumpkin', 
    img: '/assets/images/menu-3.png', 
    badge: null, 
    price: '$10.00', 
    desc: 'Typesetting industry lorem Lorem Ipsum is simply dummy text of the priand.' 
  },
  { 
    name: 'Tokusen Wagyu', 
    img: '/assets/images/menu-4.png', 
    badge: 'New', 
    price: '$39.00', 
    desc: 'Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.' 
  },
  { 
    name: 'Olivas Rellenas', 
    img: '/assets/images/menu-5.png', 
    badge: null, 
    price: '$25.00', 
    desc: 'Avocados with crab meat, red onion, crab salad stuffed red bell pepper and green bell pepper.' 
  },
  { 
    name: 'Opu Fish', 
    img: '/assets/images/menu-6.png', 
    badge: null, 
    price: '$49.00', 
    desc: 'Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.' 
  },
]

export default function Menu() {
  return (
    <section 
      id="menu" 
      className="relative bg-eerie-black-1 py-[70px] lg:py-[100px] overflow-hidden z-[1] scroll-mt-[100px]"
    >
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
        {/* Section Header with stagger */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainerFast}
          className="text-center mb-[40px] xl:mb-[60px]"
        >
          <motion.div variants={fadeInUp}>
            <SectionSubtitle>Special Selection</SectionSubtitle>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="font-forum text-headline-1 text-white uppercase tracking-ls-1 mt-[12px] mb-[16px]"
          >
            Delicious Menu
          </motion.h2>
        </motion.div>

        {/* Menu Items Grid with motion */}
        <div className="relative">
          {/* Middle vertical divider line (Visible above 992px) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white-alpha-20 -translate-x-1/2 pointer-events-none" />

          <motion.ul 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerFast}
            className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-x-[90px] xl:gap-x-[200px] lg:gap-y-[55px] mb-[55px]"
          >
            {menuItems.map((item, idx) => (
              <motion.li 
                key={idx} 
                variants={fadeInUp}
                className="group flex gap-[20px] items-start"
              >
                {/* Square Image container with gold bg fade effect on hover */}
                <div className="relative w-[100px] h-[100px] rounded-24 overflow-hidden bg-white-alpha-10 flex-shrink-0 group-hover:bg-gold-crayola transition-colors duration-500">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-85"
                  />
                </div>

                {/* Card Text Content */}
                <div className="flex-grow">
                  {/* Title and Price Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-[5px] sm:gap-[15px]">
                    <h3 className="font-forum text-title-3 uppercase tracking-ls-1 text-white group-hover:text-gold-crayola transition-colors">
                      {item.name}
                    </h3>
                    
                    {/* Badge (Optional) */}
                    {item.badge && (
                      <span className="max-content border border-gold-crayola text-gold-crayola font-forum text-[1.1rem] uppercase px-[8px] py-[2px] leading-none tracking-wider self-start sm:self-auto">
                        {item.badge}
                      </span>
                    )}

                    {/* Dotted Spacer Line + Price Tag */}
                    <div className="flex-grow flex items-center gap-[15px]">
                      <div className="hidden sm:block flex-grow h-[6px] border-y border-white-alpha-20" />
                      <span className="text-gold-crayola text-title-2 font-forum leading-none flex-shrink-0">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-quick-silver text-body-2 leading-relaxed mt-[10px] pr-[10px]">
                    {item.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Dynamic Service Hours Summary & Button with fade animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainerFast}
          className="text-center mt-[40px]"
        >
          <motion.p 
            variants={fadeInUp}
            className="text-quick-silver text-body-2 tracking-ls-1 mb-[25px] leading-relaxed"
          >
            During winter daily from <span className="text-gold-crayola font-bold">7:00 pm</span> to <span className="text-gold-crayola font-bold">9:00 pm</span>
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Btn href="/menu">View All Menu</Btn>
          </motion.div>
        </motion.div>

      </div>

      {/* Decorative Floating Shapes */}
      <div className="absolute top-0 left-0 -z-10 animate-float pointer-events-none">
        <Image
          src="/assets/images/shape-5.png"
          alt="Decorative Shape"
          width={921}
          height={1036}
          className="opacity-50"
        />
      </div>

      <div className="absolute bottom-0 right-0 -z-10 animate-float [animation-delay:2.5s] pointer-events-none">
        <Image
          src="/assets/images/shape-6.png"
          alt="Decorative Shape"
          width={343}
          height={345}
        />
      </div>
    </section>
  )
}
