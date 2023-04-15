"use client"

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Post from './components/Post'
import { PostType } from './types/Posts'

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}
export default function Home() {

  const { data, error, isLoading } = useQuery<PostType[]>({ queryFn: allPosts, queryKey: ["posts"], })

  if (isLoading) {
    return <div className='flex justify-center'>Loading...</div>
  }
  if (error) {
    return <div className='flex justify-center'>error</div>
  }

  return (
    <main className='my-8'>



      <div className='flex justify-center'>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 justify-items-center'>

          <div className="relative mx-auto my-auto sm:col-span-2 lg:col-span-3 sm:w-full w-[17rem] mb-5">
            <Image className="object-cover h-64 w-full rounded-2xl sm:rounded-[2rem]" width={1024} height={680} src='/cutting-board.jpg' alt=" image" />
            <div
              className="
              absolute bottom-0 left-0 right-0 h-64 w-full 
              rounded-2xl sm:rounded-[2rem] 
              shadow-[inset_30px_0px_25px_#E58A2F,inset_-30px_0px_25px_#E58A2F]
              sm:shadow-[inset_120px_0px_50px_#E58A2F,inset_-120px_0px_50px_#E58A2F]
              "
            >
              <h1 className='text-background font-bold text-5xl m-8 mb-2'>Page with recipes</h1>
              <p className='text-background mx-8  sm:text-lg'>By Kacper Barszczewski</p>
            </div>
          </div>

          {
            data?.map((post) => (
              <Post key={post.id} id={post.id} postTitle={post.title} comments={post.comments} image={post.image} />
            ))
          }
        </div>
      </div>

    </main>
  )
}
