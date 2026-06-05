'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { IoPersonOutline, IoCalendarOutline, IoTimeOutline, IoChevronDownOutline } from 'react-icons/io5'
import Btn from '../Btn'
import Separator from '../Separator'
import { fadeInUp, staggerContainerSlow } from '@/utils/animations'

export default function Reservation() {
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    // handle booking action
  }

  return (
    <section 
      id="reservation" 
      className="relative z-20 max-w-[1200px] mx-auto px-[16px] lg:px-[20px] mt-[-270px] pb-[70px] lg:pb-[100px] scroll-mt-[360px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] bg-smoky-black-2 shadow-1 border border-white-alpha-10 rounded-24 overflow-hidden">
        
        {/* Left Side: Online Reservation Form with scroll animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerSlow}
          className="py-[50px] px-[20px] sm:px-[40px] xl:p-[75px_60px]"
        >
          <motion.h2 
            variants={fadeInUp}
            className="font-forum text-headline-2 text-white uppercase tracking-ls-1 mb-[10px] text-center lg:text-left"
          >
            Online Reservation
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-quick-silver text-body-2 mb-[30px] text-center lg:text-left leading-relaxed"
          >
            Booking request{' '}
            <a href="tel:+88123123456" className="text-gold-crayola hover:text-white transition-colors font-bold">
              +88-123-123456
            </a>{' '}
            or fill out the order form
          </motion.p>

          <form onSubmit={handleBooking} className="flex flex-col gap-[20px]">
            {/* Input Row 1: Name and Phone */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="input-field mb-0 text-[1.4rem]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="input-field mb-0 text-[1.4rem]"
              />
            </motion.div>

            {/* Input Row 2: Guests, Date, and Time */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
              
              {/* Persons Selector */}
              <div className="icon-wrapper mb-0">
                <IoPersonOutline className="text-gold-crayola" />
                <select 
                  name="guests" 
                  defaultValue="4-person"
                  className="input-field text-[1.4rem] pr-[35px]"
                >
                  <option value="1-person">1 Person</option>
                  <option value="2-person">2 Persons</option>
                  <option value="3-person">3 Persons</option>
                  <option value="4-person">4 Persons</option>
                  <option value="5-person">5 Persons</option>
                  <option value="6-person">6 Persons</option>
                  <option value="7-person">7 Persons</option>
                  <option value="8-person">8 Persons</option>
                </select>
                <IoChevronDownOutline className="text-quick-silver right-[10px]" />
              </div>

              {/* Date Input */}
              <div className="icon-wrapper mb-0">
                <IoCalendarOutline className="text-gold-crayola" />
                <input
                  type="date"
                  name="date"
                  required
                  className="input-field text-[1.4rem] pr-[35px] appearance-none"
                  style={{ colorScheme: 'dark' }}
                />
                <IoChevronDownOutline className="text-quick-silver right-[10px]" />
              </div>

              {/* Time Input */}
              <div className="icon-wrapper mb-0">
                <IoTimeOutline className="text-gold-crayola" />
                <select 
                  name="time"
                  defaultValue="08:00pm"
                  className="input-field text-[1.4rem] pr-[35px]"
                >
                  <option value="08:00am">08 : 00 am</option>
                  <option value="09:00am">09 : 00 am</option>
                  <option value="10:00am">10 : 00 am</option>
                  <option value="11:00am">11 : 00 am</option>
                  <option value="12:00pm">12 : 00 pm</option>
                  <option value="01:00pm">01 : 00 pm</option>
                  <option value="02:00pm">02 : 00 pm</option>
                  <option value="03:00pm">03 : 00 pm</option>
                  <option value="04:00pm">04 : 00 pm</option>
                  <option value="05:00pm">05 : 00 pm</option>
                  <option value="06:00pm">06 : 00 pm</option>
                  <option value="07:00pm">07 : 00 pm</option>
                  <option value="08:00pm">08 : 00 pm</option>
                  <option value="09:00pm">09 : 00 pm</option>
                  <option value="10:00pm">10 : 00 pm</option>
                </select>
                <IoChevronDownOutline className="text-quick-silver right-[10px]" />
              </div>

            </motion.div>

            {/* Message Area */}
            <motion.textarea
              variants={fadeInUp}
              name="message"
              placeholder="Message"
              className="input-field h-[140px] resize-none py-[15px] text-[1.4rem] mb-0"
            />

            {/* Submit Button */}
            <motion.div variants={fadeInUp}>
              <Btn type="submit" variant="secondary" className="w-full flex items-center justify-center h-[56px]">
                Book A Table
              </Btn>
            </motion.div>
          </form>
        </motion.div>

        {/* Right Side: Contact Info & Hours Card with motion */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerSlow}
          className="relative py-[50px] px-[20px] sm:px-[40px] xl:p-[75px_60px] bg-[url('/assets/images/form-pattern.png')] bg-cover bg-center border-t lg:border-t-0 lg:border-l border-white-alpha-10 flex flex-col justify-center text-center lg:text-left"
        >
          {/* Black alpha card overlay for background readability */}
          <div className="absolute inset-0 bg-[rgba(12,10,8,0.95)] -z-10" />

          <motion.h2 
            variants={fadeInUp}
            className="font-forum text-headline-2 text-white uppercase tracking-ls-1 mb-[30px]"
          >
            Contact Us
          </motion.h2>

          <div className="flex flex-col gap-[25px] font-dmSans text-[1.6rem]">
            
            {/* Booking Request */}
            <motion.div variants={fadeInUp}>
              <p className="font-bold text-white uppercase text-label-1 tracking-ls-1 mb-[5px]">
                Booking Request
              </p>
              <a
                href="tel:+88123123456"
                className="text-gold-crayola hover:text-white transition-colors text-title-3 font-forum tracking-ls-1 block"
              >
                +88-123-123456
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
              <Separator className="select-none animate-rotate-slow" />
            </motion.div>

            {/* Location */}
            <motion.div variants={fadeInUp}>
              <p className="font-bold text-white uppercase text-label-1 tracking-ls-1 mb-[5px]">
                Location
              </p>
              <address className="text-quick-silver not-italic leading-relaxed">
                Restaurant St, Delicious City, <br /> London 9578, UK
              </address>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
              <Separator className="select-none animate-rotate-slow" />
            </motion.div>

            {/* Lunch Hours */}
            <motion.div variants={fadeInUp}>
              <p className="font-bold text-white uppercase text-label-1 tracking-ls-1 mb-[5px]">
                Lunch Time
              </p>
              <p className="text-quick-silver leading-relaxed">
                Monday to Sunday <br />
                11.00 am - 2.30pm
              </p>
            </motion.div>

            {/* Dinner Hours */}
            <motion.div variants={fadeInUp}>
              <p className="font-bold text-white uppercase text-label-1 tracking-ls-1 mb-[5px]">
                Dinner Time
              </p>
              <p className="text-quick-silver leading-relaxed">
                Monday to Sunday <br />
                05.00 pm - 10.00pm
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
