'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import Btn from '../Btn'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const heroSlides = [
  { 
    subtitle: 'Traditional & Hygiene', 
    title1: 'For the love of', 
    title2: 'delicious food', 
    img: '/assets/images/hero-slider-1.jpg',
    text: 'Come with family & feel the joy of mouth-watering food'
  },
  { 
    subtitle: 'Delightful experience', 
    title1: 'Flavors Inspired by', 
    title2: 'the Seasons', 
    img: '/assets/images/hero-slider-2.jpg',
    text: 'Come with family & feel the joy of mouth-watering food'
  },
  { 
    subtitle: 'Amazing & delicious', 
    title1: 'Where every flavor', 
    title2: 'tells a story', 
    img: '/assets/images/hero-slider-3.jpg',
    text: 'Come with family & feel the joy of mouth-watering food'
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(handleNext, 7000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused])

  return (
    <section 
      id="home" 
      className="relative h-[880px] min-h-[100vh] overflow-hidden text-center flex items-center justify-center pt-[120px] bg-smoky-black-3 select-none"
    >
      {/* Background Images Layer: Preloaded and rendered static DOM layers with GPU opacity transitions */}
      <div className="absolute inset-0 z-0 bg-black">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeSlide
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isActive ? 0.65 : 0,
                zIndex: isActive ? 1 : 0 
              }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
            >
              {/* Ken Burns: always start zoomed IN (1.1) and slowly drift further in to 1.18.
                  This ensures every new slide feels like a zoom-in, never a zoom-out snap. */}
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: isActive ? 1.18 : 1.05 }}
                transition={{ 
                  duration: isActive ? 8 : 1.8,
                  ease: isActive ? [0.0, 0.0, 0.2, 1] : 'easeInOut'
                }}
                className="relative w-full h-full will-change-transform"
              >
                <Image
                  src={slide.img}
                  alt={`Slider background ${index + 1}`}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Slide Text Content Layer: Fade/slide transitions in sequence */}
      <div className="relative z-10 max-w-[800px] mx-auto px-[20px] flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="flex flex-col items-center select-text"
          >
            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-gold-crayola font-bold text-label-2 uppercase tracking-ls-2"
            >
              {heroSlides[activeSlide].subtitle}
            </motion.p>

            {/* Subtitle Separator */}
            <motion.div
              variants={fadeInUp}
              className="relative w-[100px] h-[15px] mt-[14px] mb-[20px] flex items-center justify-center"
            >
              <Image
                src="/assets/images/separator.svg"
                alt="Separator"
                width={100}
                height={15}
                style={{ width: 'auto', height: 'auto' }}
              />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="font-forum text-display-1 uppercase tracking-ls-1 leading-[1.1em] text-white mb-[15px]"
            >
              {heroSlides[activeSlide].title1} <br /> {heroSlides[activeSlide].title2}
            </motion.h1>

            {/* Text Description */}
            <motion.p
              variants={fadeInUp}
              className="text-body-2 text-quick-silver tracking-ls-1 max-w-[500px] mx-auto mt-[10px] mb-[40px] leading-relaxed"
            >
              {heroSlides[activeSlide].text}
            </motion.p>

            {/* View Menu Button */}
            <motion.div variants={fadeInUp}>
              <Btn href="/menu">View Our Menu</Btn>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev/Next Slider Control Buttons */}
      <button
        onClick={handlePrev}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="hidden md:grid absolute left-[30px] top-1/2 -translate-y-1/2 z-20 w-[45px] h-[45px] border border-gold-crayola text-gold-crayola rotate-45 place-items-center transition-all duration-2 hover:bg-gold-crayola hover:text-black cursor-pointer shadow-1"
        aria-label="Previous Slide"
      >
        <IoChevronBack className="-rotate-45 text-[2rem] font-bold" />
      </button>

      <button
        onClick={handleNext}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="hidden md:grid absolute right-[30px] top-1/2 -translate-y-1/2 z-20 w-[45px] h-[45px] border border-gold-crayola text-gold-crayola rotate-45 place-items-center transition-all duration-2 hover:bg-gold-crayola hover:text-black cursor-pointer shadow-1"
        aria-label="Next Slide"
      >
        <IoChevronForward className="-rotate-45 text-[2rem] font-bold" />
      </button>

      {/* Floating Circular Rotating "Book A Table" Button */}
      <Link
        href="/reserve"
        className="absolute bottom-[15px] right-[15px] xl:bottom-[50px] xl:right-[50px] z-20 bg-gold-crayola w-[110px] h-[110px] p-[12px] flex flex-col justify-center items-center shadow-1 transition-transform hover:scale-[1.05] group scale-[0.6] sm:scale-[0.7] xl:scale-100"
      >
        <div className="absolute inset-0 border border-gold-crayola animate-rotate-slow pointer-events-none group-hover:scale-[1.05] transition-all" />
        <Image
          src="/assets/images/hero-icon.png"
          alt="Book Icon"
          width={48}
          height={48}
          className="mx-auto mb-[6px] w-[32px] xl:w-[48px] h-auto"
        />
        <span className="text-black font-bold uppercase tracking-ls-1 text-[1rem] xl:text-[1.2rem] leading-tight select-none">
          Book A Table
        </span>
      </Link>
    </section>
  )
}
