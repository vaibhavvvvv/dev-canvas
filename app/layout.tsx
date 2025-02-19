import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Outfit } from 'next/font/google'
import localFont from 'next/font/local'

// Import Raleway Dots
const ralewayDots = localFont({
  src: '../public/fonts/RalewayDots-Regular.ttf',
  variable: '--font-raleway-dots',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Vaibhav Portfolio',
  description: 'Software Engineer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${ralewayDots.variable}`}>
      <body className="bg-[#0a0a0a]">
        <div className="fixed inset-0 w-full h-full">
          <div className="absolute inset-0">
            <div className="animated-bg" />
            <div className="animated-grid" />
            <div className="animated-shapes" />
            <div className="circuit-pattern" />
            <div className="scan-lines" />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  )
}
