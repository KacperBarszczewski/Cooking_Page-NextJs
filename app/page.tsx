"use client"

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import AddPost from './dashboard/admin/createPost/AddPost'
import Post from './components/Post'
import { PostType } from './types/Posts'

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}
export default function Home() {

  const { data, error, isLoading } = useQuery<PostType[]>({ queryFn: allPosts, queryKey: ["posts"], })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>error</div>
  }

  return (
    <main className='flex justify-center my-8'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3'>
        {data?.map((post) => (
        <Post key={post.id} id={post.id} postTitle={post.title} comments={post.comments} image={post.image}/>
      ))}
      </div>
      
    </main>
  )
}
