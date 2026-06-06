import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import BodyLoader from '@/components/BodyLoader'
import ContactHero from '@/components/sections/ContactHero'
import ContactInfo from '@/components/sections/ContactInfo'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Spice Valley',
  description: 'Get in touch with Spice Valley. Write us, call us, or visit us at our restaurant location.',
}

export default function ContactPage() {
  return (
    <>
      {/* Unlock scroll for direct URL navigation (PageTransition handles click nav) */}
      <BodyLoader />

      {/* Shared sticky header */}
      <Header />

      <main>
        {/* 1. Hero banner with map background + breadcrumb */}
        <ContactHero />

        {/* 2. Write Us / Call Us / Visit Us info cards */}
        <ContactInfo />

        {/* 3. Message form */}
        <ContactForm />
      </main>

      {/* Shared footer */}
      <Footer />

      {/* Back to top */}
      <BackToTop />
    </>
  )
}
