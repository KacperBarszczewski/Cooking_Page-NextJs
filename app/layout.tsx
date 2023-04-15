import Nav from './auth/Nav'
import './globals.css'
import QueryWrapper from "./auth/QueryWrapper"
import Link from 'next/link'

export const metadata = {
  title: 'Cooking Page',
  description: 'Created by Kacper Barszczewski',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className='bg-background text-typography'>
        <div className='min-h-screen '>
          <QueryWrapper>
            {/* @ts-expect-error Server Component */}
            <Nav />
            {children}
          </QueryWrapper>
        </div>
        <div className='bg-primary h-7 flex justify-center items-center'>
          <Link href="https://github.com/KacperBarszczewski" className='text-xs text-background'>@Kacper Barszczewski</Link>
        </div>
      </body>

    </html>
  )
}
