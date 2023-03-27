"use client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
import AddPost from './components/AddPost'


export default function Home() {
  return (
    <main >
      <h1 className='text-red-500'>Hello</h1>
      <AddPost />
    </main>
  )
}
