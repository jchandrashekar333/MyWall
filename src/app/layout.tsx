import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mywall - One URL. Beautiful Portfolio.',
  description: 'Built for professionals and students.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
