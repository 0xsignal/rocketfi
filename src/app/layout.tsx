import * as React from 'react'
import type { Metadata } from 'next'

import '../styles/globals.css'
import '../styles/fonts.css'

export const metadata: Metadata = {
  title: 'Rocket Pool DeFi Integration Explorer - RocketFi',
  description: 'RocketFi is a community-driven, unofficial explorer for Rocket Pool DeFi opportunities. It helps rETH holders maximize their participation in DeFi to earn rewards and unlock the utility of rETH. Additionally, it supports node operators in leveraging DeFi to enhance their node operations.',
  openGraph: {
    title: 'Rocket Pool DeFi Integration Explorer - RocketFi',
    description: 'RocketFi is a community-driven, unofficial explorer for Rocket Pool DeFi opportunities. It helps rETH holders maximize their participation in DeFi to earn rewards and unlock the utility of rETH. Additionally, it supports node operators in leveraging DeFi to enhance their node operations.',
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
