'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IoPersonCircleOutline } from 'react-icons/io5'
import SectionSubtitle from '../SectionSubtitle'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const blogPosts = [
  {
    category: ['Deserts', 'Salads'],
    img: '/assets/images/service-1.jpg',
    title: 'Business Breakfast',
    excerpt:
      'Consectetur adipisicing elit. Soluta, impedit, saepe. Unde minima distinctio officiis amet temporibus, consequuntur dolorem dicta…',
    author: 'Oleksandr',
    date: 'May 1, 2021',
  },
  {
    category: ['Deserts'],
    img: '/assets/images/service-2.jpg',
    title: 'Pancakes in Chocolate',
    excerpt:
      'Consectetur adipisicing elit. Soluta, impedit, saepe. Unde minima distinctio officiis amet temporibus, consequuntur dolorem dicta…',
    author: 'Oleksandr',
    date: 'May 1, 2021',
  },
  {
    category: ['Deserts'],
    img: '/assets/images/service-3.jpg',
    title: 'Tuna & Tomatoes',
    excerpt:
      'Consectetur adipisicing elit. Soluta, impedit, saepe. Unde minima distinctio officiis amet temporibus, consequuntur dolorem dicta…',
    author: 'Oleksandr',
    date: 'May 1, 2021',
  },
]

export default function Newsletter() {
  return (
    <section
      id="newsletter"
      className="relative bg-white py-[70px] lg:py-[100px] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">

        {/* ── Section Header ─────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="text-center mb-[50px] lg:mb-[70px]"
        >
          <motion.div variants={fadeInUp}>
            <SectionSubtitle>Newsletter</SectionSubtitle>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-forum text-headline-2 text-smoky-black-1 capitalize leading-[1.2] mt-[12px] mb-[18px]"
          >
            Use the tips <br /> and recipes of our chefs
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-body-2 text-davys-grey max-w-[440px] mx-auto leading-relaxed"
          >
            Porro eveniet, autem ipsam corrupti consectetur cum. Repudiandae dignissimos fugiat sit nam.
          </motion.p>
        </motion.div>

        {/* ── Blog Cards Grid ─────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]"
        >
          {blogPosts.map((post, idx) => (
            <motion.article
              key={idx}
              variants={fadeInUp}
              className="group bg-white rounded-[4px] border border-[hsla(0,0%,0%,0.08)] shadow-[0_4px_20px_hsla(0,0%,0%,0.06)] overflow-hidden hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.12)] transition-shadow duration-[400ms]"
            >
              {/* Card Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.06]"
                />
                {/* Category Badge */}
                <div className="absolute top-[14px] left-[14px] flex gap-[6px] flex-wrap">
                  {post.category.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-gold-crayola text-black font-bold text-[1rem] uppercase tracking-ls-3 px-[10px] py-[4px] leading-none"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-[24px] pb-[20px]">
                <h3 className="font-forum text-title-4 text-smoky-black-1 mb-[10px] leading-snug group-hover:text-gold-crayola transition-colors duration-[300ms]">
                  <Link href="#newsletter">{post.title}</Link>
                </h3>

                <p className="text-body-2 text-davys-grey leading-relaxed mb-[4px]">
                  {post.excerpt}{' '}
                  <Link
                    href="#newsletter"
                    className="text-gold-crayola font-bold uppercase text-label-2 tracking-ls-3 hover:text-smoky-black-1 transition-colors"
                  >
                    Read More
                  </Link>
                </p>
              </div>

              {/* Card Footer – author + date */}
              <div className="flex items-center justify-between px-[24px] pb-[20px] pt-[12px] border-t border-[hsla(0,0%,0%,0.06)]">
                <div className="flex items-center gap-[10px]">
                  <IoPersonCircleOutline className="text-[3.2rem] text-davys-grey shrink-0" />
                  <span className="text-body-2 font-bold text-smoky-black-1">{post.author}</span>
                </div>
                <span className="text-label-1 text-quick-silver bg-[hsla(38,61%,73%,0.12)] px-[10px] py-[4px] rounded-[2px]">
                  {post.date}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ── Bottom CTA bar ─────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row items-center justify-between gap-[20px] mt-[50px] pt-[30px] border-t border-[hsla(0,0%,0%,0.08)]"
        >
          <motion.p
            variants={fadeInUp}
            className="text-body-2 text-davys-grey max-w-[540px] text-center sm:text-left leading-relaxed"
          >
            Read the news of our restaurant, recipes for delicious meals, tips for your home kitchen in our blog!
          </motion.p>

          <motion.div variants={fadeInUp} className="shrink-0">
            <Link
              href="#newsletter"
              className="inline-flex items-center gap-[8px] bg-gold-crayola text-black font-bold uppercase tracking-ls-3 text-label-2 px-[28px] py-[14px] hover:bg-smoky-black-1 hover:text-gold-crayola transition-all duration-[300ms] shadow-[0_4px_16px_hsla(38,61%,73%,0.35)] hover:shadow-[0_4px_16px_hsla(0,0%,0%,0.3)]"
            >
              All Publications
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
