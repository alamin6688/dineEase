'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionSubtitle from '../SectionSubtitle'
import Btn from '../Btn'
import { fadeInUp, scaleUp, staggerContainer } from '@/utils/animations'

export default function About() {
  const mainBannerRef = useRef<HTMLDivElement>(null)
  const absImg1Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = -((e.clientX / window.innerWidth * 10) - 5)
      const y = -((e.clientY / window.innerHeight * 10) - 5)

      if (mainBannerRef.current) {
        mainBannerRef.current.style.transform = `translate3d(${x * 1.0}px, ${y * 1.0}px, 0px)`
      }
      if (absImg1Ref.current) {
        absImg1Ref.current.style.transform = `translate3d(${x * 1.75}px, ${y * 1.75}px, 0px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      id="about" 
      className="relative bg-eerie-black-1 py-[70px] lg:py-[100px] xl:py-[170px_100px] overflow-hidden scroll-mt-[100px]"
    >
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px] grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-[80px] lg:gap-[30px] items-center">
        
        {/* Left Column: Story text and contact with stagger animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.div variants={fadeInUp}>
            <SectionSubtitle align="left" className="mb-[15px]">Our Story</SectionSubtitle>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="font-forum text-headline-2 text-white uppercase tracking-ls-1 mt-[10px] mb-[20px] leading-tight"
          >
            Every Flavor Tells <br /> a Story
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-quick-silver text-body-2 leading-relaxed mb-[30px] max-w-[500px]"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
          </motion.p>

          {/* Book Through Call */}
          <motion.div variants={fadeInUp} className="mb-[26px]">
            <p className="font-bold text-white uppercase text-label-1 tracking-ls-1 mb-[5px]">
              Book Through Call
            </p>
            <a
              href="tel:+804001234567"
              className="text-gold-crayola hover-underline text-body-1 md:text-[3rem] xl:text-[2.4rem] font-forum tracking-ls-1 block"
            >
              +80 (400) 123 4567
            </a>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Btn href="/about">Read More</Btn>
          </motion.div>
        </motion.div>

        {/* Right Column: Premium Banner Graphics with Parallax & Motion */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleUp}
          className="relative w-full max-w-[570px] mx-auto lg:ml-auto"
        >
          {/* Main Parallax Banner Wrapper */}
          <div 
            ref={mainBannerRef}
            className="about-banner relative pl-[50px] sm:pl-[90px] mb-[120px] transition-transform duration-500 ease-out will-change-transform"
          >
            <div className="relative aspect-square w-full rounded-24 overflow-hidden border border-white-alpha-10">
              <Image
                src="/assets/images/about-banner.jpg"
                alt="Cooking gourmet food"
                fill
                sizes="(max-width: 992px) 100vw, 570px"
                className="object-cover"
              />
            </div>

            {/* Overlapping Abs image 1 (Bottom Left) */}
            <div
              ref={absImg1Ref}
              className="abs-img-1 absolute -bottom-[80px] sm:-bottom-[120px] left-0 w-[150px] sm:w-[285px] aspect-square rounded-24 overflow-hidden border border-white-alpha-10 pattern-strip py-[20px] sm:py-[50px] transition-transform duration-300 ease-out will-change-transform z-10"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/assets/images/about-abs-image.jpg"
                  alt="Restaurant layout preview"
                  fill
                  sizes="(max-width: 575px) 150px, 285px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Rotating Badge 2 (Top Right) */}
            <div className="abs-img-2 absolute -top-[45px] sm:-top-[65px] right-0 w-[100px] sm:w-[133px] aspect-square flex items-center justify-center z-10">
              {/* Spinning Ring */}
              <div className="absolute inset-0 bg-[url('/assets/images/badge-2-bg.png')] bg-contain bg-no-repeat bg-center animate-rotate-slow" />
              {/* Badge Icon */}
              <Image
                src="/assets/images/badge-2.png"
                alt="Quality badge"
                width={133}
                height={134}
                className="w-[80%] h-auto z-10 relative"
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Decorative Floating Shape (Visible above 1400px) */}
      <div className="hidden 2xl:block absolute top-[46%] left-0 -z-10 animate-float">
        <Image
          src="/assets/images/shape-3.png"
          alt="Decorative Shape"
          width={197}
          height={194}
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </section>
  )
}
