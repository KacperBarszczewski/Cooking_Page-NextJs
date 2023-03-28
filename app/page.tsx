"use client"

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import AddPost from './components/AddPost'

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}
export default function Home() {

  const { data, error, isLoading } = useQuery({ queryFn: allPosts, queryKey: ["posts"], })

  if(isLoading){
    return "Loading..."
  }
  if(error){
    return "error"
  }
  console.log(data)

  return (
    <main >
      <h1 className='text-red-500'>Hello</h1>
      <AddPost />
    </main>
  )
}
