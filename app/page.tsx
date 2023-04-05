"use client"

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import AddPost from './components/AddPost'
import Post from './components/Post'
import { PostType } from './types/Posts'

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}
export default function Home() {

  const { data, error, isLoading } = useQuery<PostType[]>({ queryFn: allPosts, queryKey: ["posts"], })

  if (isLoading) {
    return "Loading..."
  }
  if (error) {
    return "error"
  }
  console.log(data)

  return (
    <main >
      <AddPost />
      {data?.map((post) => (
        <Post key={post.id} id={post.id} postTitle={post.title} comments={post.comments}/>
      ))}
    </main>
  )
}
