'use client'
import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import BodyLoader from '@/components/BodyLoader'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  IoCalendarOutline, 
  IoPersonOutline, 
  IoTimeOutline, 
  IoChevronDownOutline, 
  IoCheckmarkCircleOutline, 
  IoHourglassOutline, 
  IoCloseOutline, 
  IoTrashOutline, 
  IoArrowBackOutline, 
  IoArrowForwardOutline,
  IoRestaurantOutline,
  IoCallOutline,
  IoMailOutline
} from 'react-icons/io5'

// Types
interface ReservationData {
  id: string
  guests: number
  date: string // YYYY-MM-DD
  time: string // HH:MM
  salutation: string
  firstName: string
  lastName: string
  email: string
  phone: string
  occasion: string
  specialRequests: string
}

export default function ReservePage() {
  const [isMounted, setIsMounted] = useState(false)
  
  // Steps state
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [direction, setDirection] = useState<number>(1) // For slide direction anim

  // Active reservations state
  const [activeReservations, setActiveReservations] = useState<ReservationData[]>([])
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  // Step 1: Selection Form State
  const [selectedGuests, setSelectedGuests] = useState<number>(2)
  const [isLargeParty, setIsLargeParty] = useState(false)
  const [largePartyInput, setLargePartyInput] = useState('')
  const [selectedDate, setSelectedDate] = useState('') // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState('19:30')

  // Step 2: Personal Details State
  const [salutation, setSalutation] = useState('Mr.')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [occasion, setOccasion] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  // Hold Timer (10 minutes = 600 seconds)
  const [holdTimeRemaining, setHoldTimeRemaining] = useState(600)
  const [isHoldTimerActive, setIsHoldTimerActive] = useState(false)

  // Calendar view state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [lastConfirmedReservation, setLastConfirmedReservation] = useState<ReservationData | null>(null)

  // Time Slots
  const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

  // Initial mount logic
  useEffect(() => {
    setIsMounted(true)
    setCurrentTime(new Date())

    // Set default selected date as tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const yyyy = tomorrow.getFullYear()
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const dd = String(tomorrow.getDate()).padStart(2, '0')
    setSelectedDate(`${yyyy}-${mm}-${dd}`)

    // Load active reservations from localstorage
    try {
      const stored = localStorage.getItem('spice_valley_reservations')
      if (stored) {
        setActiveReservations(JSON.parse(stored))
      }
    } catch (err) {
      console.error('Failed to load reservations:', err)
    }
  }, [])

  // Live countdown timer for active reservations
  useEffect(() => {
    if (!isMounted) return
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [isMounted])

  // Hold timer countdown logic
  useEffect(() => {
    if (!isHoldTimerActive) return
    if (holdTimeRemaining <= 0) {
      // Hold expired
      setIsHoldTimerActive(false)
      alert('Your 10-minute hold time has expired. Please select a table again.')
      setStep(1)
      setHoldTimeRemaining(600)
      return
    }

    const interval = setInterval(() => {
      setHoldTimeRemaining(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isHoldTimerActive, holdTimeRemaining])

  // Start hold timer when reaching Step 2, and stop when returning to Step 1
  useEffect(() => {
    if (step >= 2) {
      setIsHoldTimerActive(true)
    } else {
      setIsHoldTimerActive(false)
      setHoldTimeRemaining(600) // Reset hold time
    }
  }, [step])

  // Save active reservations to localStorage
  const saveReservations = (newResList: ReservationData[]) => {
    setActiveReservations(newResList)
    try {
      localStorage.setItem('spice_valley_reservations', JSON.stringify(newResList))
    } catch (err) {
      console.error('Failed to save reservations:', err)
    }
  }

  // Handle step changes with transition directions
  const navigateToStep = (targetStep: 1 | 2 | 3) => {
    setDirection(targetStep > step ? 1 : -1)
    setStep(targetStep)
  }

  // Guest buttons selection
  const handleGuestSelect = (num: number) => {
    setSelectedGuests(num)
    setIsLargeParty(false)
  }

  const handleLargePartySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseInt(largePartyInput, 10)
    if (num > 0) {
      setSelectedGuests(num)
    }
  }

  // Calendar Helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getStartDayOfMonth = (year: number, month: number) => {
    // 0 = Sunday, 1 = Monday, etc.
    const day = new Date(year, month, 1).getDay()
    // Shift so Monday is index 0, Sunday is 6
    return day === 0 ? 6 : day - 1
  }

  const handleMonthPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(prev => prev - 1)
    } else {
      setCurrentMonth(prev => prev - 1)
    }
  }

  const handleMonthNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(prev => prev + 1)
    } else {
      setCurrentMonth(prev => prev + 1)
    }
  }

  const renderCalendar = () => {
    const startOffset = getStartDayOfMonth(currentYear, currentMonth)
    const totalDays = getDaysInMonth(currentYear, currentMonth)
    
    // Previous month total days for padding
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)

    const today = new Date()
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    const cells = []

    // Add days from previous month
    for (let i = startOffset - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
      cells.push({ day: dayNum, dateStr, isCurrentMonth: false })
    }

    // Add days from current month
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      cells.push({ day: d, dateStr, isCurrentMonth: true })
    }

    // Add days from next month to complete the row if necessary
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
    const remainingCells = 42 - cells.length
    for (let d = 1; d <= remainingCells; d++) {
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      cells.push({ day: d, dateStr, isCurrentMonth: false })
    }

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    return (
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-[20px]">
          <h3 className="font-forum text-title-3 font-bold text-smoky-black-1 uppercase tracking-ls-1">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <div className="flex gap-[10px]">
            <button
              type="button"
              onClick={handleMonthPrev}
              className="p-[10px] bg-white border border-[hsla(0,0%,0%,0.08)] rounded-full hover:bg-gold-crayola/10 hover:text-gold-crayola transition-all text-smoky-black-1"
              aria-label="Previous Month"
            >
              <IoArrowBackOutline size={16} />
            </button>
            <button
              type="button"
              onClick={handleMonthNext}
              className="p-[10px] bg-white border border-[hsla(0,0%,0%,0.08)] rounded-full hover:bg-gold-crayola/10 hover:text-gold-crayola transition-all text-smoky-black-1"
              aria-label="Next Month"
            >
              <IoArrowForwardOutline size={16} />
            </button>
          </div>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-[6px] text-center">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(wd => (
            <div key={wd} className="text-davys-grey font-bold text-[1.1rem] tracking-ls-1 py-1">
              {wd}
            </div>
          ))}
          {cells.map((cell, idx) => {
            const isSelected = selectedDate === cell.dateStr
            const isPast = cell.dateStr < todayStr
            const isCurrent = cell.isCurrentMonth

            return (
              <button
                key={`${cell.dateStr}-${idx}`}
                type="button"
                disabled={isPast || !isCurrent}
                onClick={() => setSelectedDate(cell.dateStr)}
                className={`py-2 text-[1.4rem] w-[38px] h-[38px] mx-auto rounded-md flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-smoky-black-1 text-white font-bold shadow-md'
                    : isPast || !isCurrent
                      ? 'text-quick-silver/40 cursor-not-allowed'
                      : 'hover:bg-gold-crayola/20 text-smoky-black-1 font-medium'
                }`}
              >
                {cell.day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Format YYYY-MM-DD into a premium readable date
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return ''
    const parts = dateStr.split('-')
    if (parts.length !== 3) return dateStr
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10))
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
  }

  // Format 24-hour time to 12-hour format with AM/PM
  const format12HourTime = (time24: string) => {
    if (!time24) return ''
    const parts = time24.split(':')
    if (parts.length !== 2) return time24
    const hrs = parseInt(parts[0], 10)
    const mins = parts[1]
    const ampm = hrs >= 12 ? 'PM' : 'AM'
    const displayHrs = hrs % 12 || 12
    const paddedHrs = displayHrs < 10 ? `0${displayHrs}` : displayHrs
    return `${paddedHrs}:${mins} ${ampm}`
  }

  // Format hold timer into MM:SS
  const formatHoldTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Submit Reservation
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault()

    const newRes: ReservationData = {
      id: `SPICE-${Math.floor(100000 + Math.random() * 900000)}`,
      guests: selectedGuests,
      date: selectedDate,
      time: selectedTime,
      salutation,
      firstName,
      lastName,
      email,
      phone,
      occasion,
      specialRequests
    }

    const updated = [newRes, ...activeReservations]
    saveReservations(updated)
    setLastConfirmedReservation(newRes)
    setShowSuccessModal(true)
  }

  // Cancel Reservation
  const handleCancelReservation = (id: string) => {
    const filtered = activeReservations.filter(r => r.id !== id)
    saveReservations(filtered)
  }

  // Reset reservation wizard
  const resetForm = () => {
    // Reset inputs
    setSelectedGuests(2)
    setIsLargeParty(false)
    setLargePartyInput('')
    
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const yyyy = tomorrow.getFullYear()
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const dd = String(tomorrow.getDate()).padStart(2, '0')
    setSelectedDate(`${yyyy}-${mm}-${dd}`)
    setSelectedTime('19:30')

    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setOccasion('')
    setSpecialRequests('')
    setHoldTimeRemaining(600)
    
    // Back to step 1
    navigateToStep(1)
    setShowSuccessModal(false)
  }

  // Format countdown remaining time for active reservations list
  const formatCountdown = (resDate: string, resTime: string) => {
    if (!currentTime) return 'Calculating...'
    const target = new Date(`${resDate}T${resTime}:00`)
    const diff = target.getTime() - currentTime.getTime()

    if (diff <= 0) {
      return 'Arrived / In Progress'
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const m = Math.floor((diff / (1000 * 60)) % 60)
    const s = Math.floor((diff / 1000) % 60)

    const parts = []
    if (d > 0) parts.push(`${d}d`)
    if (h > 0 || d > 0) parts.push(`${h}h`)
    if (m > 0 || h > 0 || d > 0) parts.push(`${m}m`)
    parts.push(`${s}s`)

    return parts.join(' ') + ' remaining'
  }

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }
    })
  }

  const inputBaseClass = 
    'w-full bg-transparent border-b border-[hsla(0,0%,0%,0.15)] py-[10px] text-body-2 text-smoky-black-1 placeholder:text-quick-silver focus:outline-none focus:border-gold-crayola transition-colors duration-[250ms]'

  return (
    <>
      <BodyLoader />
      <Header />

      <main className="bg-[#FAF9F6] pt-[140px] pb-[100px] lg:pt-[180px] lg:pb-[140px] min-h-screen text-smoky-black-1 font-dmSans">
        <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
          
          {/* 1. DYNAMIC LIST OF ACTIVE RESERVATIONS (APPEARS ABOVE FORM) */}
          {isMounted && activeReservations.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-[50px] bg-white border border-[hsla(38,61%,73%,0.25)] rounded-24 p-[24px] sm:p-[32px] shadow-[0_10px_40px_rgba(0,0%,0%,0.03)]"
            >
              <div className="flex items-center gap-[12px] mb-[20px] border-b border-[hsla(0,0%,0%,0.06)] pb-[12px]">
                <div className="w-[10px] h-[10px] bg-gold-crayola rotate-45 rounded-sm" />
                <h2 className="font-forum text-title-3 uppercase tracking-ls-2 text-smoky-black-1">
                  Your Upcoming Reservations
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                {activeReservations.map(res => (
                  <div 
                    key={res.id}
                    className="relative bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.06)] rounded-xl p-[20px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[16px] transition-all hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center gap-[8px] mb-[6px]">
                        <span className="text-[1.2rem] font-bold tracking-wider text-gold-crayola uppercase bg-smoky-black-1 px-[8px] py-[3px] rounded-md">
                          {res.id}
                        </span>
                        <span className="text-[1.3rem] text-davys-grey font-semibold">
                          {res.guests} Guests
                        </span>
                      </div>
                      
                      <h3 className="font-forum text-[1.8rem] font-bold text-smoky-black-1 uppercase tracking-ls-1 leading-snug">
                        {formatDisplayDate(res.date)} at {res.time}
                      </h3>
                      
                      <div className="flex items-center gap-[6px] mt-[6px] text-gold-crayola font-bold text-[1.3rem] uppercase tracking-wider">
                        <IoHourglassOutline className="animate-pulse" />
                        <span>{formatCountdown(res.date, res.time)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCancelReservation(res.id)}
                      className="p-[10px] text-davys-grey hover:text-red-600 hover:bg-red-50 rounded-full transition-all border border-transparent hover:border-red-100 self-end sm:self-auto"
                      title="Cancel Reservation"
                    >
                      <IoTrashOutline size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PAGE HERO HEADER */}
          <div className="text-center mb-[40px]">
            <span className="text-gold-crayola uppercase text-label-2 font-bold tracking-ls-3 block mb-[10px]">
              Spice Valley Experience
            </span>
            <h1 className="font-forum text-display-1 uppercase text-smoky-black-1 tracking-ls-1 leading-[1.1] mb-[10px]">
              Secure Your Experience
            </h1>
            <p className="text-body-2 text-davys-grey max-w-[620px] mx-auto leading-relaxed">
              Refined flavors, artisanal spice, and an atmosphere of quiet luxury await you.
            </p>
          </div>

          {/* 2. PROGRESS TABS HEADER */}
          <div className="max-w-[700px] mx-auto mb-[50px] relative border-b border-[hsla(0,0%,0%,0.06)] pb-[12px] flex justify-between items-center text-[1.2rem] font-bold uppercase tracking-ls-1">
            {/* Step 1 Tab Indicator */}
            <div className="flex flex-col items-center flex-1">
              {step > 1 ? (
                <div className="w-[28px] h-[28px] bg-gold-crayola rounded-full flex items-center justify-center text-white mb-2 shadow-sm">
                  <IoCheckmarkCircleOutline size={18} />
                </div>
              ) : (
                <span className={`pb-[6px] ${step === 1 ? 'text-gold-crayola border-b-2 border-gold-crayola' : 'text-quick-silver'}`}>
                  01 Table
                </span>
              )}
              {step > 1 && <span className="text-gold-crayola text-[1rem]">01 Table</span>}
            </div>

            <div className="w-[60px] h-[1px] bg-[hsla(0,0%,0%,0.08)] mb-2" />

            {/* Step 2 Tab Indicator */}
            <div className="flex flex-col items-center flex-1">
              {step > 2 ? (
                <div className="w-[28px] h-[28px] bg-gold-crayola rounded-full flex items-center justify-center text-white mb-2 shadow-sm">
                  <IoCheckmarkCircleOutline size={18} />
                </div>
              ) : (
                <span className={`pb-[6px] ${step === 2 ? 'text-gold-crayola border-b-2 border-gold-crayola' : 'text-quick-silver'}`}>
                  02 Details
                </span>
              )}
              {step > 2 && <span className="text-gold-crayola text-[1rem]">02 Details</span>}
            </div>

            <div className="w-[60px] h-[1px] bg-[hsla(0,0%,0%,0.08)] mb-2" />

            {/* Step 3 Tab Indicator */}
            <div className="flex flex-col items-center flex-1">
              <span className={`pb-[6px] ${step === 3 ? 'text-gold-crayola border-b-2 border-gold-crayola' : 'text-quick-silver'}`}>
                03 Review
              </span>
            </div>
          </div>

          {/* 3. MULTI-STEP TAB FORM CONTENT */}
          <div className="max-w-[1000px] mx-auto min-h-[500px]">
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[35px] items-start"
                >
                  {/* Left Box: Guests + Calendar picker */}
                  <div className="bg-white rounded-24 p-[24px] sm:p-[40px] shadow-[0_10px_40px_rgba(0,0%,0%,0.03)] border border-[hsla(0,0%,0%,0.04)]">
                    {/* Guests selection */}
                    <div className="mb-[35px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-2 text-davys-grey mb-[12px]">
                        Number of Guests
                      </span>
                      <div className="flex flex-wrap gap-[10px]">
                        {[2, 3, 4, 5, 6].map(num => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => handleGuestSelect(num)}
                            className={`px-[24px] py-[12px] font-bold text-[1.3rem] rounded-lg transition-all ${
                              selectedGuests === num && !isLargeParty
                                ? 'bg-smoky-black-1 text-white shadow-md'
                                : 'bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.06)] hover:border-gold-crayola/50'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setIsLargeParty(true)
                            setSelectedGuests(8)
                          }}
                          className={`px-[24px] py-[12px] font-bold text-[1.3rem] rounded-lg transition-all ${
                            isLargeParty
                              ? 'bg-smoky-black-1 text-white shadow-md'
                              : 'bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.06)] hover:border-gold-crayola/50'
                          }`}
                        >
                          Large Party
                        </button>
                      </div>

                      {/* Large party inputs */}
                      {isLargeParty && (
                        <motion.form 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          onSubmit={handleLargePartySubmit}
                          className="mt-[15px] flex gap-[10px]"
                        >
                          <input
                            type="number"
                            min="7"
                            max="50"
                            placeholder="Enter guests quantity (e.g. 12)"
                            value={largePartyInput}
                            onChange={(e) => setLargePartyInput(e.target.value)}
                            className="bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.1)] rounded px-[16px] py-[10px] text-body-2 placeholder:text-quick-silver focus:outline-none focus:border-gold-crayola w-[200px]"
                            required
                          />
                          <button
                            type="submit"
                            className="bg-gold-crayola text-black font-bold uppercase text-label-2 px-[20px] rounded hover:bg-smoky-black-1 hover:text-gold-crayola transition-colors"
                          >
                            Set Guests
                          </button>
                        </motion.form>
                      )}
                    </div>

                    {/* Custom Calendar date picker */}
                    <div className="border-t border-[hsla(0,0%,0%,0.06)] pt-[30px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-2 text-davys-grey mb-[15px]">
                        Preferred Date
                      </span>
                      {renderCalendar()}
                    </div>
                  </div>

                  {/* Right Box: Available time slots + summary */}
                  <div className="flex flex-col gap-[25px]">
                    {/* Time slots container */}
                    <div className="bg-white rounded-24 p-[24px] shadow-[0_10px_40px_rgba(0,0%,0%,0.03)] border border-[hsla(0,0%,0%,0.04)]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-2 text-davys-grey mb-[16px]">
                        Available Time Slots
                      </span>
                      
                      <div className="grid grid-cols-2 gap-[10px]">
                        {timeSlots.map(time => {
                          const isSelected = selectedTime === time
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-[12px] font-bold text-[1.3rem] rounded-lg text-center transition-all ${
                                isSelected
                                  ? 'bg-[#7d6329] text-white shadow-md'
                                  : 'bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.06)] hover:border-gold-crayola/50'
                              }`}
                            >
                              {time}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Summary selection card */}
                    <div className="bg-[#EAE8E3] rounded-24 p-[24px] border border-[hsla(0,0%,0%,0.04)]">
                      <h3 className="font-forum text-title-3 font-bold uppercase tracking-ls-1 mb-[20px] text-smoky-black-1">
                        Your Selection
                      </h3>

                      <div className="flex flex-col gap-[14px] mb-[25px] text-[1.4rem]">
                        <div className="flex justify-between border-b border-[hsla(0,0%,0%,0.08)] pb-[8px]">
                          <span className="text-davys-grey">Guests:</span>
                          <span className="font-bold">{selectedGuests} Guests</span>
                        </div>
                        <div className="flex justify-between border-b border-[hsla(0,0%,0%,0.08)] pb-[8px]">
                          <span className="text-davys-grey">Date:</span>
                          <span className="font-bold">{selectedDate ? formatDisplayDate(selectedDate) : 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between border-b border-[hsla(0,0%,0%,0.08)] pb-[8px]">
                          <span className="text-davys-grey">Time:</span>
                          <span className="font-bold">{selectedTime ? format12HourTime(selectedTime) : 'Not selected'}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateToStep(2)}
                        disabled={!selectedDate || !selectedTime}
                        className="bg-smoky-black-1 text-white hover:text-gold-crayola font-bold uppercase tracking-ls-3 text-label-2 py-[16px] w-full flex items-center justify-center gap-[10px] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <span>Next: Your Details</span>
                        <IoArrowForwardOutline size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="max-w-[760px] mx-auto bg-white rounded-24 p-[24px] sm:p-[45px] shadow-[0_10px_40px_rgba(0,0%,0%,0.03)] border border-[hsla(0,0%,0%,0.04)]"
                >
                  {/* Warning banner */}
                  <div className="bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] rounded-xl p-[16px] flex items-center gap-[12px] mb-[30px] text-[1.4rem]">
                    <IoHourglassOutline className="flex-shrink-0 text-[1.8rem] animate-spin-slow" />
                    <span>
                      Due to limited availability, we can hold this table for you for{' '}
                      <strong className="font-mono">{formatHoldTime(holdTimeRemaining)}</strong> minutes.
                    </span>
                  </div>

                  <h2 className="font-forum text-headline-2 uppercase text-smoky-black-1 tracking-ls-1 mb-[8px]">
                    Your Details
                  </h2>
                  <p className="text-body-2 text-davys-grey mb-[35px]">
                    Please provide your contact information to secure your reservation.
                  </p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      navigateToStep(3)
                    }} 
                    className="flex flex-col gap-[30px]"
                  >
                    {/* Personal info fields */}
                    <div className="flex flex-col gap-[20px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-2 text-davys-grey border-b border-[hsla(0,0%,0%,0.06)] pb-[6px]">
                        Personal Information
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[20px]">
                        
                        {/* Salutation selection */}
                        <div>
                          <label className="block text-[1.1rem] font-bold uppercase text-davys-grey mb-1">
                            Salutation*
                          </label>
                          <div className="relative">
                            <select
                              value={salutation}
                              onChange={(e) => setSalutation(e.target.value)}
                              className={`${inputBaseClass} pr-[25px] appearance-none cursor-pointer bg-transparent`}
                            >
                              <option value="Mr.">Mr.</option>
                              <option value="Ms.">Ms.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Dr.">Dr.</option>
                            </select>
                            <IoChevronDownOutline className="absolute right-0 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                          </div>
                        </div>

                        {/* Dummy gap for grids alignment */}
                        <div className="hidden md:block" />

                        {/* First Name */}
                        <div>
                          <label className="block text-[1.1rem] font-bold uppercase text-davys-grey mb-1">
                            First Name*
                          </label>
                          <input
                            type="text"
                            placeholder="John"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={inputBaseClass}
                          />
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-[1.1rem] font-bold uppercase text-davys-grey mb-1">
                            Last Name*
                          </label>
                          <input
                            type="text"
                            placeholder="Doe"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputBaseClass}
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-[1.1rem] font-bold uppercase text-davys-grey mb-1">
                            Email Address*
                          </label>
                          <input
                            type="email"
                            placeholder="john.doe@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputBaseClass}
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-[1.1rem] font-bold uppercase text-davys-grey mb-1">
                            Phone Number*
                          </label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={inputBaseClass}
                          />
                        </div>

                      </div>
                    </div>

                    {/* Additional details */}
                    <div className="flex flex-col gap-[20px]">
                      <span className="block text-[1.2rem] font-bold uppercase tracking-ls-2 text-davys-grey border-b border-[hsla(0,0%,0%,0.06)] pb-[6px]">
                        Additional Details
                      </span>

                      <div className="flex flex-col gap-[20px]">
                        {/* Occasion select */}
                        <div>
                          <label className="block text-[1.1rem] font-bold uppercase text-davys-grey mb-1">
                            Occasion (Optional)
                          </label>
                          <div className="relative">
                            <select
                              value={occasion}
                              onChange={(e) => setOccasion(e.target.value)}
                              className={`${inputBaseClass} pr-[25px] appearance-none cursor-pointer bg-transparent`}
                            >
                              <option value="">Select an occasion</option>
                              <option value="Birthday">Birthday</option>
                              <option value="Anniversary">Anniversary</option>
                              <option value="Date Night">Date Night</option>
                              <option value="Business Meal">Business Meal</option>
                              <option value="Other">Other Celebration</option>
                            </select>
                            <IoChevronDownOutline className="absolute right-0 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                          </div>
                        </div>

                        {/* Special requests textarea */}
                        <div>
                          <label className="block text-[1.1rem] font-bold uppercase text-davys-grey mb-1">
                            Special Requests
                          </label>
                          <textarea
                            placeholder="Allergies, seating preferences, etc."
                            rows={4}
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.1)] rounded-lg p-[12px] text-body-2 placeholder:text-quick-silver focus:outline-none focus:border-gold-crayola transition-colors resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step buttons */}
                    <div className="flex justify-between items-center mt-[10px] gap-[16px]">
                      <button
                        type="button"
                        onClick={() => navigateToStep(1)}
                        className="btn btn-secondary flex items-center justify-center gap-[10px] font-bold border border-gray-300 py-[12px] px-[28px] rounded cursor-pointer"
                      >
                        <IoArrowBackOutline size={16} />
                        <span>Back to Selection</span>
                      </button>
                      
                      <button
                        type="submit"
                        className="bg-smoky-black-1 text-white hover:text-gold-crayola font-bold uppercase tracking-ls-3 text-label-2 py-[14px] px-[36px] flex items-center justify-center gap-[10px] transition-all cursor-pointer"
                      >
                        <span>Review Reservation</span>
                        <IoArrowForwardOutline size={16} />
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="max-w-[800px] mx-auto flex flex-col gap-[30px]"
                >
                  <div className="text-center">
                    <h2 className="font-forum text-headline-2 uppercase text-smoky-black-1 tracking-ls-1 mb-[8px]">
                      Review Your Reservation
                    </h2>
                    <p className="text-body-2 text-davys-grey mb-[25px]">
                      &ldquo;A moment of anticipation before the culinary journey begins.&rdquo;
                    </p>
                  </div>

                  {/* Summary details side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                    {/* Left Card: Booking Details */}
                    <div className="bg-white rounded-24 p-[24px] sm:p-[32px] shadow-[0_10px_40px_rgba(0,0%,0%,0.02)] border border-[hsla(0,0%,0%,0.04)] flex flex-col gap-[18px]">
                      <div>
                        <span className="text-[1.1rem] font-bold tracking-ls-1 uppercase text-gold-crayola block mb-[2px]">
                          RESTAURANT
                        </span>
                        <div className="flex items-center gap-[10px] font-forum text-[2rem] font-bold">
                          <IoRestaurantOutline className="text-gold-crayola" />
                          <span>Spice Valley Authentic Indian</span>
                        </div>
                      </div>

                      <div className="h-[1px] bg-[hsla(0,0%,0%,0.05)]" />

                      <div className="flex flex-col gap-[12px] text-[1.4rem]">
                        <div className="flex items-center gap-[12px]">
                          <IoCalendarOutline className="text-gold-crayola text-[1.8rem] shrink-0" />
                          <div>
                            <span className="block text-[1rem] text-davys-grey leading-none font-bold uppercase">Date</span>
                            <span className="font-bold">{formatDisplayDate(selectedDate)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-[12px]">
                          <IoTimeOutline className="text-gold-crayola text-[1.8rem] shrink-0" />
                          <div>
                            <span className="block text-[1rem] text-davys-grey leading-none font-bold uppercase">Time</span>
                            <span className="font-bold">{format12HourTime(selectedTime)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-[12px]">
                          <IoPersonOutline className="text-gold-crayola text-[1.8rem] shrink-0" />
                          <div>
                            <span className="block text-[1rem] text-davys-grey leading-none font-bold uppercase">Guests</span>
                            <span className="font-bold">{selectedGuests} People</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Card: Customer Contact Info */}
                    <div className="bg-white rounded-24 p-[24px] sm:p-[32px] shadow-[0_10px_40px_rgba(0,0%,0%,0.02)] border border-[hsla(0,0%,0%,0.04)] flex flex-col justify-between gap-[20px]">
                      <div>
                        <span className="text-[1.1rem] font-bold tracking-ls-1 uppercase text-gold-crayola block mb-[10px]">
                          CONTACT INFORMATION
                        </span>

                        <div className="flex flex-col gap-[12px] text-[1.4rem] mb-[20px]">
                          <div>
                            <span className="block text-[1rem] text-davys-grey leading-none font-bold uppercase">Name</span>
                            <span className="font-bold">{salutation} {firstName} {lastName}</span>
                          </div>
                          <div>
                            <span className="block text-[1rem] text-davys-grey leading-none font-bold uppercase font-dmSans">Email</span>
                            <span className="font-bold flex items-center gap-[6px]">
                              <IoMailOutline className="text-quick-silver" />
                              {email}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[1rem] text-davys-grey leading-none font-bold uppercase">Phone</span>
                            <span className="font-bold flex items-center gap-[6px]">
                              <IoCallOutline className="text-quick-silver" />
                              {phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleConfirmReservation}
                        className="bg-[#7d6329] hover:bg-smoky-black-1 text-white hover:text-gold-crayola font-bold uppercase tracking-ls-3 text-label-2 py-[16px] w-full flex items-center justify-center gap-[10px] transition-all shadow-md cursor-pointer"
                      >
                        <span>CONFIRM RESERVATION</span>
                        <IoArrowForwardOutline size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Special Requests details box */}
                  {specialRequests && (
                    <div className="bg-white rounded-24 p-[24px] shadow-[0_10px_40px_rgba(0,0%,0%,0.02)] border border-[hsla(0,0%,0%,0.04)]">
                      <span className="text-[1.1rem] font-bold tracking-ls-1 uppercase text-gold-crayola block mb-[8px]">
                        SPECIAL REQUESTS & NOTES
                      </span>
                      <p className="text-body-2 italic text-davys-grey leading-relaxed">
                        &ldquo;{specialRequests}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Footer Terms */}
                  <p className="text-[1.2rem] text-davys-grey text-center leading-relaxed font-medium mt-[10px]">
                    By confirming, you agree to our 24-hour cancellation policy. A temporary hold may be placed on your card for no-shows.
                  </p>

                  {/* Modify details shortcut */}
                  <button
                    type="button"
                    onClick={() => navigateToStep(2)}
                    className="text-[1.2rem] text-gold-crayola hover:text-smoky-black-1 font-bold uppercase tracking-ls-2 transition-all self-center mt-[10px] hover:underline"
                  >
                    MODIFY DETAILS
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* 4. SUCCESS POPUP MODAL OVERLAY */}
      <AnimatePresence>
        {showSuccessModal && lastConfirmedReservation && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-[16px] overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black-alpha-80 cursor-pointer"
            />

            {/* Modal Card content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[520px] bg-white rounded-24 shadow-[0_20px_60px_rgba(0,0%,0%,0.2)] border border-[hsla(0,0%,0%,0.06)] p-[32px] sm:p-[40px] text-center z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={resetForm}
                className="absolute top-[20px] right-[20px] p-[8px] bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.06)] rounded-full hover:bg-gold-crayola/15 text-smoky-black-1 transition-all"
                aria-label="Close dialog"
              >
                <IoCloseOutline size={20} />
              </button>

              {/* Animated check circle */}
              <div className="w-[70px] h-[70px] bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-[24px] border border-green-100">
                <IoCheckmarkCircleOutline className="w-[48px] h-[48px]" />
              </div>

              <h2 className="font-forum text-[2.8rem] sm:text-[3.6rem] uppercase tracking-ls-1 text-smoky-black-1 leading-tight mb-[12px]">
                Reservation Completed!
              </h2>
              <p className="text-body-2 text-davys-grey leading-relaxed mb-[24px]">
                Your table is confirmed. We are looking forward to providing you an unforgettable culinary experience.
              </p>

              {/* Summary Details in Card */}
              <div className="bg-[#FAF9F6] rounded-xl border border-[hsla(0,0%,0%,0.06)] p-[20px] text-left text-[1.4rem] mb-[28px]">
                <div className="flex justify-between border-b border-[hsla(0,0%,0%,0.06)] pb-[8px] mb-[8px]">
                  <span className="text-davys-grey">Reservation ID:</span>
                  <span className="font-bold uppercase text-gold-crayola">{lastConfirmedReservation.id}</span>
                </div>
                <div className="flex justify-between border-b border-[hsla(0,0%,0%,0.06)] pb-[8px] mb-[8px]">
                  <span className="text-davys-grey">Guests:</span>
                  <span className="font-bold text-smoky-black-1">{lastConfirmedReservation.guests} People</span>
                </div>
                <div className="flex justify-between border-b border-[hsla(0,0%,0%,0.06)] pb-[8px] mb-[8px]">
                  <span className="text-davys-grey">Date:</span>
                  <span className="font-bold text-smoky-black-1">{formatDisplayDate(lastConfirmedReservation.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-davys-grey">Time:</span>
                  <span className="font-bold text-smoky-black-1">{format12HourTime(lastConfirmedReservation.time)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="bg-smoky-black-1 text-white hover:text-gold-crayola font-bold uppercase tracking-ls-3 text-label-2 py-[16px] w-full rounded-xl transition-all cursor-pointer shadow-md"
              >
                Make Another Reservation
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </>
  )
}
