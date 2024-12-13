import * as React from 'react'
import type { Metadata } from 'next'

import '../styles/globals.css'
import '../styles/fonts.css'

export const metadata: Metadata = {
  title: 'RocketFi',
  description: 'Rocket Pool DeFi Integration Explorer',
  openGraph: {
    title: 'RocketFi',
    description: 'Rocket Pool DeFi Integration Explorer',
    url: 'https://rocketfi.vercel.app/',
    siteName: 'RocketFi',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  )
}
