'use client'
import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import BodyLoader from '@/components/BodyLoader'
import Btn from '@/components/Btn'
import Separator from '@/components/Separator'

export default function NotFound() {
  return (
    <>
      {/* Enable body scrolling once this page mounts */}
      <BodyLoader />

      {/* Shared Header Navigation */}
      <Header />

      <main className="relative min-h-[90vh] flex items-center justify-center bg-smoky-black-1 pt-[140px] pb-[80px] overflow-hidden">
        {/* Parallax-style background image with dark overlay */}
        <div className="absolute inset-0 z-0 bg-[url('/assets/images/footer-bg.jpg')] bg-cover bg-center opacity-15 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-smoky-black-1 pointer-events-none" />

        {/* Content Box */}
        <div className="relative z-10 max-w-[800px] mx-auto px-[20px] text-center flex flex-col items-center justify-center">
          <span className="font-forum text-[1.8rem] sm:text-[2rem] text-gold-crayola italic tracking-ls-2 mb-[10px] uppercase">
            Deliciously Lost
          </span>

          <h1 className="font-forum text-[12rem] sm:text-[16rem] text-gold-crayola leading-none tracking-ls-3 select-none mb-[10px] filter drop-shadow-[0_2px_10px_rgba(212,169,106,0.2)] animate-pulse">
            404
          </h1>

          <h2 className="font-forum text-title-1 text-white uppercase tracking-ls-1 mb-[25px] leading-tight">
            This Page is Off the Menu
          </h2>

          {/* Three rotating square separators to match premium brand patterns */}
          <div className="flex justify-center gap-[4px] mb-[30px] select-none">
            <Separator className="animate-rotate-slow" />
            <Separator className="animate-rotate-slow" />
            <Separator className="animate-rotate-slow" />
          </div>

          <p className="text-quick-silver text-body-2 leading-relaxed mb-[45px] max-w-[500px]">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us guide you back to our main table.
          </p>

          <Btn href="/">
            Go Back Home
          </Btn>
        </div>
      </main>

      {/* Shared Brand Footer */}
      <Footer />

      {/* Floating Action Button */}
      <BackToTop />
    </>
  )
}
