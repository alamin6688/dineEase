'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  IoCalendarOutline, 
  IoPersonOutline, 
  IoDocumentTextOutline,
  IoChevronDownOutline, 
  IoRestaurantOutline, 
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoArrowForward
} from 'react-icons/io5'
import { fadeInUp, staggerContainer } from '@/utils/animations'

export default function EventsForm() {
  const [form, setForm] = useState({
    eventDate: '', // Initialize empty to avoid Next.js hydration mismatch
    startTime: '',
    endTime: '',
    title: 'Without title',
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    phonePrefix: '+44', // Default to GB prefix
    phoneNumber: '',
    specialRequests: '',
  })

  const [minDate, setMinDate] = useState('')

  // Set the local current date after mount
  useEffect(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    const currentDateStr = `${yyyy}-${mm}-${dd}`
    
    setForm(prev => ({ ...prev, eventDate: currentDateStr }))
    setMinDate(currentDateStr)
  }, [])

  // Guests selector dropdown state
  const [isGuestsOpen, setIsGuestsOpen] = useState(false)
  const [guestsCount, setGuestsCount] = useState('')
  const [exactGuests, setExactGuests] = useState('')
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  const guestRanges = ['0 - 10', '10 - 25', '25 - 50', '50 - 100', '100 - 150']

  // Handle click outside to close guests dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGuestsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelectRange = (range: string) => {
    setGuestsCount(range)
    setIsGuestsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    // Clear form
    setForm({
      eventDate: minDate,
      startTime: '',
      endTime: '',
      title: 'Without title',
      company: '',
      firstName: '',
      lastName: '',
      email: '',
      phonePrefix: '+44',
      phoneNumber: '',
      specialRequests: '',
    })
    setGuestsCount('')
    setExactGuests('')
  }

  // Format YYYY-MM-DD date representation to MM/DD/YYYY representation
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const parts = dateStr.split('-') // YYYY-MM-DD
    if (parts.length === 3) {
      return `${parts[1]}/${parts[2]}/${parts[0]}` // MM/DD/YYYY
    }
    return dateStr
  }

  // Format time (HH:mm) to AM/PM style
  const formatTime = (timeStr: string) => {
    if (!timeStr) return '-:- -'
    const [hours, minutes] = timeStr.split(':')
    const hh = parseInt(hours, 10)
    const ampm = hh >= 12 ? 'PM' : 'AM'
    const h12 = hh % 12 || 12
    const paddedH = h12 < 10 ? `0${h12}` : h12
    return `${paddedH}:${minutes} ${ampm}`
  }

  const inputBase =
    'w-full bg-transparent border-b border-[hsla(0,0%,0%,0.2)] py-[12px] text-body-2 text-smoky-black-1 placeholder:text-quick-silver focus:outline-none focus:border-gold-crayola transition-colors duration-[250ms]'

  return (
    <section className="bg-[#FAF9F6] pt-[140px] pb-[70px] lg:pt-[180px] lg:pb-[100px] font-dmSans min-h-screen">
      <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">

        {/* Page Header (sitting below dark top banner and above the columns) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="text-center mb-[50px]"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-forum text-display-1 text-smoky-black-1 uppercase tracking-ls-1 leading-[1.1] mb-[12px]"
          >
            Event Requests
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-body-2 text-davys-grey max-w-[620px] mx-auto leading-relaxed"
          >
            Elevate your special moments with our bespoke catering and event planning services.
          </motion.p>
        </motion.div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-[50px] xl:gap-[85px] items-start">
          
          {/* Left Column: Image and Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="w-full"
          >
            {/* Image Card */}
            <motion.div 
              variants={fadeInUp}
              className="relative w-full aspect-[4/5] rounded-24 overflow-hidden shadow-1 border border-[hsla(0,0%,0%,0.05)] group bg-eerie-black-4"
            >
              <Image
                src="/assets/images/hero-slider-1.jpg"
                alt="Luxury Dining Room Setting"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-1" />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <span className="text-gold-crayola uppercase text-label-2 font-bold tracking-ls-1 block mb-2">
                  FINEST VENUES
                </span>
                <h2 className="font-forum text-title-1 text-white uppercase tracking-ls-3 leading-tight">
                  Unforgettable Settings
                </h2>
              </div>
            </motion.div>

            {/* Description Text */}
            <motion.div variants={fadeInUp} className="mt-[40px] border-l-2 border-gold-crayola pl-[20px]">
              <h3 className="font-forum text-title-4 text-smoky-black-1 uppercase tracking-ls-1 mb-[12px]">
                Tailored Experiences
              </h3>
              <p className="text-body-2 text-davys-grey leading-relaxed mb-[25px]">
                From intimate corporate dinners to grand wedding celebrations, our dedicated events team ensures every detail reflects the prestige of Spice Valley. Let us craft a bespoke menu that delights your guests and creates lasting memories.
              </p>
              
              <div className="flex items-center gap-[12px] text-gold-crayola">
                <IoRestaurantOutline size={20} />
                <span className="font-forum text-title-3 uppercase tracking-ls-1">
                  Michelin-Inspired Menus
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Light Mode Form Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="w-full"
          >
            <div className="bg-white shadow-[0_4px_30px_rgba(0,0%,0%,0.05)] border border-[hsla(0,0%,0%,0.06)] rounded-24 p-[24px] sm:p-[40px] md:p-[50px]">
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-[35px]">
                
                {/* 01. EVENT DETAILS SECTION */}
                <motion.div variants={fadeInUp} className="flex flex-col gap-[20px]">
                  <div className="flex justify-between items-center border-b border-[hsla(0,0%,0%,0.1)] pb-[8px] mb-[10px]">
                    <h3 className="font-forum text-[1.6rem] font-bold text-[#E4C590] tracking-ls-1 uppercase">
                      01. Event Details
                    </h3>
                    <IoCalendarOutline className="text-[#E4C590] text-[2rem]" />
                  </div>

                  {/* Grid fields for event details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] gap-y-[20px]">
                    
                    {/* Number of Guests (Custom Dropdown Selector in Light Mode) */}
                    <div className="relative mb-[10px]" ref={dropdownRef}>
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        Number of Guests*
                      </span>
                      <div 
                        onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                        className="w-full border-b border-[hsla(0,0%,0%,0.2)] py-[12px] flex items-center justify-between text-body-2 cursor-pointer select-none"
                      >
                        <span className={guestsCount ? 'text-smoky-black-1' : 'text-quick-silver'}>
                          {guestsCount || 'Enter quantity'}
                        </span>
                      </div>

                      {/* Light-Mode Custom Dropdown Panel */}
                      <AnimatePresence>
                        {isGuestsOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 top-full mt-[8px] bg-white border border-[hsla(0,0%,0%,0.1)] shadow-[0_10px_30px_rgba(0,0%,0%,0.1)] rounded-xl z-50 p-[15px]"
                          >
                            {/* Exact input row */}
                            <div 
                              className="flex gap-[8px] border-b border-[hsla(0,0%,0%,0.1)] pb-[12px] mb-[8px]"
                              onClick={(e) => e.stopPropagation()} // Prevent closing dropdown on form click
                            >
                              <input
                                type="number"
                                min="1"
                                placeholder="Enter exact number of guests"
                                value={exactGuests}
                                onChange={(e) => setExactGuests(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (exactGuests.trim()) {
                                      setGuestsCount(`${exactGuests}`);
                                      setIsGuestsOpen(false);
                                    }
                                  }
                                }}
                                className="w-full bg-[#F5F4F0] border border-[hsla(0,0%,0%,0.1)] rounded px-[12px] py-[6px] text-body-2 text-smoky-black-1 placeholder:text-quick-silver focus:outline-none focus:border-gold-crayola"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (exactGuests.trim()) {
                                    setGuestsCount(`${exactGuests}`);
                                    setIsGuestsOpen(false);
                                  }
                                }}
                                className="bg-gold-crayola text-black font-bold uppercase text-[1rem] tracking-wider px-[14px] py-[6px] rounded hover:bg-smoky-black-1 hover:text-gold-crayola transition-colors"
                              >
                                Add
                              </button>
                            </div>

                            {/* Range choices */}
                            <div className="flex flex-col gap-[2px]">
                              {guestRanges.map((range) => (
                                <button
                                  key={range}
                                  type="button"
                                  onClick={() => handleSelectRange(range)}
                                  className="w-full text-left text-body-2 text-smoky-black-1 px-[10px] py-[8px] hover:bg-[hsla(38,61%,73%,0.15)] rounded transition-colors"
                                >
                                  {range}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Event Date Picker */}
                    <div className="relative mb-[10px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        Event Date*
                      </span>
                      <div 
                        onClick={(e) => {
                          try {
                            e.currentTarget.querySelector('input')?.showPicker();
                          } catch {}
                        }}
                        className="relative cursor-pointer"
                      >
                        <div className="w-full border-b border-[hsla(0,0%,0%,0.2)] py-[12px] flex items-center justify-between text-body-2 text-smoky-black-1 pointer-events-none">
                          <span className={form.eventDate ? 'text-smoky-black-1' : 'text-quick-silver'}>
                            {form.eventDate ? formatDate(form.eventDate) : formatDate(minDate)}
                          </span>
                          <IoCalendarOutline className="text-[1.8rem] text-smoky-black-1" />
                        </div>
                        <input
                          type="date"
                          name="eventDate"
                          min={minDate}
                          value={form.eventDate}
                          onChange={handleChange}
                          required
                          className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
                          style={{ colorScheme: 'light' }}
                        />
                      </div>
                    </div>

                    {/* Start Time */}
                    <div className="relative mb-[10px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        Start Time
                      </span>
                      <div 
                        onClick={(e) => {
                          try {
                            e.currentTarget.querySelector('input')?.showPicker();
                          } catch {}
                        }}
                        className="relative cursor-pointer"
                      >
                        <div className="w-full border-b border-[hsla(0,0%,0%,0.2)] py-[12px] flex items-center justify-between text-body-2 text-smoky-black-1 pointer-events-none">
                          <span className={form.startTime ? 'text-smoky-black-1' : 'text-quick-silver'}>
                            {form.startTime ? formatTime(form.startTime) : '-:- -'}
                          </span>
                          <div className="flex items-center">
                            <IoTimeOutline className="text-[1.8rem] text-smoky-black-1" />
                          </div>
                        </div>
                        <input
                          type="time"
                          name="startTime"
                          value={form.startTime}
                          onChange={handleChange}
                          className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
                          style={{ colorScheme: 'light' }}
                        />
                      </div>
                    </div>

                    {/* End Time */}
                    <div className="relative mb-[10px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        End Time
                      </span>
                      <div 
                        onClick={(e) => {
                          try {
                            e.currentTarget.querySelector('input')?.showPicker();
                          } catch {}
                        }}
                        className="relative cursor-pointer"
                      >
                        <div className="w-full border-b border-[hsla(0,0%,0%,0.2)] py-[12px] flex items-center justify-between text-body-2 text-smoky-black-1 pointer-events-none">
                          <span className={form.endTime ? 'text-smoky-black-1' : 'text-quick-silver'}>
                            {form.endTime ? formatTime(form.endTime) : '-:- -'}
                          </span>
                          <div className="flex items-center">
                            <IoTimeOutline className="text-[1.8rem] text-smoky-black-1" />
                          </div>
                        </div>
                        <input
                          type="time"
                          name="endTime"
                          value={form.endTime}
                          onChange={handleChange}
                          className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
                          style={{ colorScheme: 'light' }}
                        />
                      </div>
                    </div>

                  </div>
                </motion.div>

                {/* 02. CONTACT INFORMATION SECTION */}
                <motion.div variants={fadeInUp} className="flex flex-col gap-[20px]">
                  <div className="flex justify-between items-center border-b border-[hsla(0,0%,0%,0.1)] pb-[8px] mb-[10px]">
                    <h3 className="font-forum text-[1.6rem] font-bold text-[#E4C590] tracking-ls-1 uppercase">
                      02. Contact Information
                    </h3>
                    <IoPersonOutline className="text-[#E4C590] text-[2rem]" />
                  </div>

                  {/* Title and Company fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] gap-y-[20px]">
                    
                    {/* Title dropdown selection (Without title, Mr, Mrs) */}
                    <div className="relative mb-[10px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        Title
                      </span>
                      <div className="relative">
                        <select
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          className={`${inputBase} pr-[30px] appearance-none cursor-pointer bg-transparent`}
                        >
                          <option value="Without title">Without title</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                        </select>
                        <IoChevronDownOutline className="absolute right-0 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="relative mb-[10px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        Company
                      </span>
                      <input
                        type="text"
                        name="company"
                        placeholder="Enter company name"
                        value={form.company}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>

                    {/* First Name */}
                    <div className="relative mb-[10px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        First Name*
                      </span>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className={inputBase}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="relative mb-[10px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        Last Name*
                      </span>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className={inputBase}
                      />
                    </div>

                    {/* Email */}
                    <div className="relative mb-[10px] sm:col-span-2">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        Email Address*
                      </span>
                      <input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={inputBase}
                      />
                    </div>

                    {/* Phone Number with country dropdown code and vertical divider */}
                    <div className="relative mb-[10px] sm:col-span-2">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                        Phone Number*
                      </span>
                      <div className="flex items-center border-b border-[hsla(0,0%,0%,0.2)]">
                        <div className="relative flex items-center pr-[12px] shrink-0">
                          <select
                            name="phonePrefix"
                            value={form.phonePrefix}
                            onChange={handleChange}
                            className="bg-transparent py-[12px] text-body-2 text-smoky-black-1 font-medium focus:outline-none cursor-pointer pr-[20px] appearance-none"
                          >
                            <option value="+44">GB +44</option>
                            <option value="+1">US +1</option>
                            <option value="+91">IN +91</option>
                            <option value="+880">BD +880</option>
                            <option value="+61">AU +61</option>
                          </select>
                          <IoChevronDownOutline size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                        </div>
                        
                        {/* Vertical separator */}
                        <div className="h-[20px] w-[1px] bg-[hsla(0,0%,0%,0.15)] mx-[12px]" />
                        
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="1234567890"
                          value={form.phoneNumber}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent py-[12px] text-body-2 text-smoky-black-1 placeholder:text-quick-silver focus:outline-none"
                        />
                      </div>
                    </div>

                  </div>
                </motion.div>

                {/* 03. ADDITIONAL REQUESTS SECTION */}
                <motion.div variants={fadeInUp} className="flex flex-col gap-[20px]">
                  <div className="flex justify-between items-center border-b border-[hsla(0,0%,0%,0.1)] pb-[8px] mb-[10px]">
                    <h3 className="font-forum text-[1.6rem] font-bold text-[#E4C590] tracking-ls-1 uppercase">
                      03. Additional Requests
                    </h3>
                    <IoDocumentTextOutline className="text-[#E4C590] text-[2rem]" />
                  </div>

                  <div className="relative mb-[10px]">
                    <span className="block text-[1.2rem] font-bold uppercase tracking-ls-1 text-davys-grey mb-1">
                      Special requirements or notes?
                    </span>
                    <textarea
                      name="specialRequests"
                      value={form.specialRequests}
                      onChange={handleChange}
                      placeholder="Dietary restrictions, preferred seating, or special occasions..."
                      rows={5}
                      className="w-full bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.12)] rounded-lg p-[16px] text-body-2 text-smoky-black-1 placeholder:text-quick-silver focus:outline-none focus:border-gold-crayola transition-colors resize-none"
                    />
                  </div>
                </motion.div>

                {/* Submit button status */}
                <motion.div variants={fadeInUp} className="w-full mt-[10px]">
                  {sent ? (
                    <div className="w-full bg-[rgba(212,169,106,0.15)] text-center py-[16px] rounded border border-gold-crayola">
                      <p className="text-body-2 font-bold text-gold-crayola tracking-ls-1 uppercase">
                        ✓ Request sent! Our manager will call you.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="bg-[#705829] hover:bg-smoky-black-1 text-white hover:text-gold-crayola font-bold uppercase tracking-ls-3 text-label-2 py-[16px] w-full flex items-center justify-center gap-[12px] transition-all duration-[300ms] shadow-md cursor-pointer"
                    >
                      <span>Send Request</span>
                      <IoArrowForward size={16} />
                    </button>
                  )}
                </motion.div>

                {/* Contact manager disclaimer */}
                <div className="flex items-center justify-center gap-[8px] text-[1.2rem] text-davys-grey font-medium text-center uppercase tracking-wider">
                  <IoShieldCheckmarkOutline size={16} className="text-gold-crayola flex-shrink-0" />
                  <span>Our events coordinator will contact you within 24 hours.</span>
                </div>

              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
