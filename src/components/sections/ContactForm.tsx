'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionSubtitle from '../SectionSubtitle'
import { fadeInUp, staggerContainer } from '@/utils/animations'
import { toast } from 'react-hot-toast'

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value
    if (e.target.name === 'phone') {
      value = value.replace(/[^0-9]/g, '')
    }
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    toast.success('Message sent successfully!')
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  }

  const inputBase =
    'w-full bg-transparent border-b border-[hsla(0,0%,0%,0.2)] py-[14px] text-body-2 text-smoky-black-1 placeholder:text-quick-silver focus:outline-none focus:border-gold-crayola transition-colors duration-[250ms]'

  return (
    <section className="bg-white py-[70px] lg:py-[100px]">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="text-center mb-[50px]"
        >
          <motion.div variants={fadeInUp}>
            <SectionSubtitle>Contact</SectionSubtitle>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-forum text-headline-2 text-smoky-black-1 capitalize leading-[1.2] mt-[4px]"
          >
            Write us a message
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-body-2 text-davys-grey mt-[14px]"
          >
            Porro eveniet, autem ipsam vitae consequatur!
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          onSubmit={handleSubmit}
          className="max-w-[820px] mx-auto"
        >
          {/* Row 1: First + Last name */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-[40px]"
          >
            <div className="mb-[30px]">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className={inputBase}
              />
            </div>
            <div className="mb-[30px]">
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className={inputBase}
              />
            </div>
          </motion.div>

          {/* Row 2: Email + Phone */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-[40px]"
          >
            <div className="mb-[30px]">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className={inputBase}
              />
            </div>
            <div className="mb-[30px]">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number*"
                required
                className={inputBase}
              />
            </div>
          </motion.div>

          {/* Row 3: Message */}
          <motion.div variants={fadeInUp} className="mb-[40px]">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows={5}
              required
              className={`${inputBase} resize-none`}
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeInUp} className="text-center">
            {sent ? (
              <p className="text-body-2 font-bold text-gold-crayola tracking-ls-3 uppercase">
                ✓ Message sent! We&apos;ll be in touch soon.
              </p>
            ) : (
              <button
                type="submit"
                className="inline-block bg-gold-crayola text-black font-bold uppercase tracking-ls-3 text-label-2 px-[40px] py-[14px] hover:bg-smoky-black-1 hover:text-gold-crayola transition-all duration-[300ms] shadow-[0_4px_16px_hsla(38,61%,73%,0.35)] hover:shadow-[0_4px_20px_hsla(0,0%,0%,0.3)] cursor-pointer"
              >
                Send Message
              </button>
            )}
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}
