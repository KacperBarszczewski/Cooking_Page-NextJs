import Nav from './auth/Nav'
import './globals.css'
import QueryWrapper from "./auth/QueryWrapper"

export const metadata = {
  title: 'Cooking Page',
  description: 'Created by Kacper Barszczewski',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className='bg-background text-typography'>
        <QueryWrapper>
          {/* @ts-expect-error Server Component */}
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
