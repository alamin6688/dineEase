import type { Metadata } from 'next'
import { DM_Sans, Forum } from 'next/font/google'
import './globals.css'
import PageTransition, { NavigationProvider } from '@/components/PageTransition'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dm-sans',
})

const forum = Forum({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-forum',
})

export const metadata: Metadata = {
  title: 'DineEase | Restaurant Landing Page',
  description: 'DineEase - Delicious Story & Flavors for Royalty. Enjoy fresh environment, hygienic food, and recipes cooked by skilled chefs.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${forum.variable} antialiased`}>
        <NavigationProvider>
          {/* Global page transition overlay — fires on every route change */}
          <PageTransition />
          {children}
        </NavigationProvider>
      </body>
    </html>
  )
}

