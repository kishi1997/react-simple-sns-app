'use client'
import { RecoilRoot } from 'recoil'
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <html lang="ja">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </RecoilRoot>
  )
}