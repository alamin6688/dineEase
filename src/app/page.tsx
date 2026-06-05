'use client'
import React from 'react'
import Preloader from '@/components/Preloader'
import Topbar from '@/components/Topbar'
import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import Service from '@/components/sections/Service'
import About from '@/components/sections/About'
import SpecialDish from '@/components/sections/SpecialDish'
import Menu from '@/components/sections/Menu'
import Testimonials from '@/components/sections/Testimonials'
import Reservation from '@/components/sections/Reservation'
import Features from '@/components/sections/Features'
import Event from '@/components/sections/Event'
import Newsletter from '@/components/sections/Newsletter'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

export default function Home() {
  return (
    <>
      {/* 1. Full-screen site preloader */}
      <Preloader />

      {/* 2. Site info Topbar (desktop-only sticky scroll tracker) */}
      <Topbar />

      {/* 3. Main floating header navigation */}
      <Header />

      {/* Main Page Content */}
      <main>
        {/* 4. Slideshow Hero banner */}
        <Hero />

        {/* 5. Food cards services */}
        <Service />

        {/* 6. Brand narrative and parallax banner */}
        <About />

        {/* 7. Special dish recommendation */}
        <SpecialDish />

        {/* 8. Detailed menu lists */}
        <Menu />

        {/* 9. Reviews quote card */}
        <Testimonials />

        {/* 10. Table reservation form */}
        <Reservation />

        {/* 11. Company strengths & icons */}
        <Features />

        {/* 12. Upcoming blog updates */}
        <Event />

        {/* 13. Newsletter / blog posts */}
        <Newsletter />
      </main>

      {/* 13. Brand Footer */}
      <Footer />

      {/* 14. Action buttons */}
      <BackToTop />
    </>
  )
}
