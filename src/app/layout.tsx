import * as React from 'react'
import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Serif, Inter } from "next/font/google";
import '../styles/globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-sans",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});



export const metadata: Metadata = {
  title: 'Rocket Pool DeFi Integration Explorer - RocketFi',
  description: 'RocketFi is a community-driven, unofficial explorer for Rocket Pool DeFi opportunities. It helps rETH holders maximize their participation in DeFi to earn rewards and unlock the utility of rETH. Additionally, it supports node operators in leveraging DeFi to enhance their node operations.',
  keywords: ['RPL', 'rETH', 'RocketPool', 'RocketFi', 'DeFi'],
  openGraph: {
    title: 'Rocket Pool DeFi Integration Explorer - RocketFi',
    description: 'RocketFi is a community-driven, unofficial explorer for Rocket Pool DeFi opportunities. It helps rETH holders maximize their participation in DeFi to earn rewards and unlock the utility of rETH. Additionally, it supports node operators in leveraging DeFi to enhance their node operations.',
    url: 'https://rocketfi.vercel.app/',
    siteName: 'RocketFi',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://rocketfi.vercel.app/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RocketFi',
    description: 'RocketFi is a community-driven, unofficial explorer for Rocket Pool DeFi opportunities. It helps rETH holders maximize their participation in DeFi to earn rewards and unlock the utility of rETH. Additionally, it supports node operators in leveraging DeFi to enhance their node operations.',
    creator: '@signal0x',
    images: ['https://rocketfi.vercel.app/og.png'], // Must be an absolute URL
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${inter.variable}`}>
      <body >
        {children}
      </body>
    </html>
  )
}
