'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { IoChatbubbleEllipsesOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'
import SectionSubtitle from '../SectionSubtitle'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const infoCards = [
  {
    icon: IoChatbubbleEllipsesOutline,
    title: 'Write Us',
    lines: ['info@spicevalley.co.uk', 'booking@spicevalley.co.uk'],
    href: 'mailto:info@spicevalley.co.uk',
  },
  {
    icon: IoCallOutline,
    title: 'Call Us',
    lines: ['+44 1204 697222'],
    href: 'tel:+441204697222',
  },
  {
    icon: IoLocationOutline,
    title: 'Visit Us',
    lines: ['171 Lee Lane, Horwich,', 'Bolton, BL6 7JD'],
    href: 'https://maps.google.com',
  },
]

export default function ContactInfo() {
  return (
    <section className="bg-white py-[70px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="text-center mb-[60px]"
        >
          <motion.div variants={fadeInUp}>
            <SectionSubtitle>Contact</SectionSubtitle>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-forum text-headline-2 text-smoky-black-1 capitalize leading-[1.2] mt-[4px]"
          >
            Contact information
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-body-2 text-davys-grey mt-[14px]"
          >
            Porro eveniet, autem ipsam vitae consequatur!
          </motion.p>
        </motion.div>

        {/* Cards row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-[30px] lg:gap-[60px]"
        >
          {infoCards.map(({ icon: Icon, title, lines, href }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              variants={fadeInUp}
              className="group flex flex-col items-center text-center gap-[16px] p-[30px] border border-[hsla(0,0%,0%,0.07)] rounded-[4px] hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.08)] transition-shadow duration-[350ms]"
            >
              {/* Icon circle */}
              <div className="w-[72px] h-[72px] rounded-full border border-[hsla(0,0%,0%,0.12)] flex items-center justify-center group-hover:border-gold-crayola group-hover:bg-[hsla(38,61%,73%,0.08)] transition-all duration-[300ms]">
                <Icon className="text-[2.8rem] text-smoky-black-1 group-hover:text-gold-crayola transition-colors duration-[300ms]" />
              </div>

              <h3 className="font-forum text-title-4 text-smoky-black-1 uppercase tracking-ls-1">
                {title}
              </h3>

              <div className="text-body-2 text-davys-grey leading-relaxed">
                {lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Dotted divider */}
        <div className="mt-[60px] border-t border-dashed border-[hsla(0,0%,0%,0.15)]" />
      </div>
    </section>
  )
}
