import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import BodyLoader from '@/components/BodyLoader'
import AboutHero from '@/components/sections/AboutHero'
import CulinaryExcellence from '@/components/sections/CulinaryExcellence'
import HospitalityService from '@/components/sections/HospitalityService'
import InclusionAccessibility from '@/components/sections/InclusionAccessibility'
import VibeAtmosphere from '@/components/sections/VibeAtmosphere'
import PracticalInfo from '@/components/sections/PracticalInfo'

export const metadata: Metadata = {
  title: 'About Us — Spice Valley',
  description: 'Discover the culinary story of Spice Valley. Explore our traditional and modern taste concepts, culinary excellence, high-standard services, accessibility features, and unique restaurant bar vibe.',
}

export default function AboutPage() {
  return (
    <>
      {/* Unlock scroll for direct URL navigation */}
      <BodyLoader />

      {/* Shared sticky header */}
      <Header />

      <main>
        {/* Section 1: Hero - Traditional & Modern */}
        <AboutHero />

        {/* Section 2: Culinary Excellence card grid */}
        <CulinaryExcellence />

        {/* Section 3: Hospitality & Service list details */}
        <HospitalityService />

        {/* Section 4: Inclusive & Accessible feature grid */}
        <InclusionAccessibility />

        {/* Section 5: Vibe & Atmosphere bar layout */}
        <VibeAtmosphere />

        {/* Section 6: Practical Info card grid */}
        <PracticalInfo />
      </main>

      {/* Shared footer */}
      <Footer />

      {/* Back to top scroll button */}
      <BackToTop />
    </>
  )
}
