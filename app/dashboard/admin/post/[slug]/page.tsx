'use client'

import AddComment from "@/app/components/AddComment"
import DeleteComment from "@/app/components/DeleteComment"
import Post from "@/app/components/Post"
import { PostType } from "@/app/types/Post"
import { useQuery } from "@tanstack/react-query"

import axios from "axios"
import Image from "next/image"

type URL = {
    params: {
        slug: string
    }
}

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url: URL) {
    const { data, isLoading, isError } = useQuery<PostType>({
        queryKey: ["detail-post"],
        queryFn: () => fetchDetails(url.params.slug)
    })

    if (isLoading) {
        return 'Loading...'
    }
    if (isError) {
        return 'error'
    }

    console.log(data)
    return (
        <div>
            <h1>Admin</h1>
            <Post id={data.id} postTitle={data.title} comments={data?.comments}  image={data?.image}/>
            <div className="bg-white">
                {data?.content}
                </div>
            {data?.ingredients?.map((comment,i) => (
                <div key={i} className="bg-yellow-100">
                    {comment}
                </div>
            ))}

            <AddComment id={data?.id} />
            {data?.comments?.map((comment) => (
                <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
                    <div className="flex items-center gap-2">
                        <Image
                            width={30}
                            height={30}
                            src={comment.user?.image}
                            alt="user image"
                            className="rounded-full"
                        />
                        <h3 className="font-bold">{comment?.user?.name}</h3>
                        <h2 className="text-sm">{comment.createdAt}</h2>
                    </div>
                    <div className="py-4">
                        {comment.message}
                    </div>
                    <DeleteComment id={comment.id}/>
                </div>
            ))}
        </div>
    )
}