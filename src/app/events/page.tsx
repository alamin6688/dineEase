import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import BodyLoader from '@/components/BodyLoader'
import EventsForm from '@/components/sections/EventsForm'
import PreFooter from '@/components/sections/PreFooter'

export const metadata: Metadata = {
  title: 'Event Requests — Spice Valley',
  description: 'Book your bespoke catering and private events at Spice Valley. We design tailored experiences and Michelin-inspired menus.',
}

export default function EventsPage() {
  return (
    <>
      {/* Unlock scroll for direct URL navigation */}
      <BodyLoader />

      {/* Shared sticky header */}
      <Header />

      <main>
        {/* 1. Events request form & details section */}
        <EventsForm />

        {/* 2. Pre-footer Spice Valley info */}
        <PreFooter />
      </main>

      {/* Shared footer */}
      <Footer />

      {/* Back to top scroll button */}
      <BackToTop />
    </>
  )
}
