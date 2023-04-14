'use client'

import AddComment from "@/app/components/AddComment"
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

const dateFormat = (date: string | undefined) => {
    if (date) {
        const date2 = new Date(date);
        return date2.toLocaleString().slice(0, 17);
    }

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

    return (
        <div className="max-w-5xl mx-auto mt-5">
            <div className="md:flex">
                <div className="basis-2/3  md:pl-5">
                    {
                        data.image ? <Image className="object-cover  h-40 w-screen md:rounded-lg md:h-96 md:w-full " width={200} height={200} src={data.image} alt={data.title + " image"} /> : <div className="h-36 w-[20rem]" />
                    }
                    <div className="py-2 px-5">
                        <h2 className="font-bold text-lg">{data.title}</h2>
                    </div>
                    <div className="py-2 px-5 flex gap-2">
                        <Image className="rounded-full w-8 " width={64} height={64} src={data.user.image} alt="author image" />
                        <p className="text-xs font-bold">{data.user.name}</p>
                    </div>
                </div>

                <div className="py-5 md:py-0 px-5 basis-1/3">
                    <div className="flex justify-center py-5 md:py-0 md:justify-start">
                        <h2 className="font-bold text-lg md:text-3xl">Ingredients</h2>
                    </div>
                    <ul className="list-inside list-disc marker:text-primary marker:text-2xl">
                        {data?.ingredients?.map((comment, i) => (
                            <li key={i} className="py-2 border-b border-primary text-sm font-semibold text-justify">
                                {comment}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            <div className="p-5 mt-5 bg-bright rounded-xl">
                <div className="flex justify-center mb-4 md:justify-start">
                    <h2 className="font-bold text-lg md:text-3xl">Description</h2>
                </div>
                <div className="bg-background p-4 rounded-xl font-semibold">
                    {data?.content}
                </div>
            </div>

            <AddComment id={data?.id} />

            {data?.comments?.map((comment) => (
                <div key={comment.id} className=" bg-white p-8 rounded-md">
                    <div className="flex items-center gap-2">
                        <Image
                            width={35}
                            height={35}
                            src={comment.user?.image}
                            alt="user image"
                            className="rounded-full"
                        />
                        <div>
                            <h3 className="text-sm font-bold">{comment?.user?.name}</h3>
                            <time className="text-[0.7rem]">{dateFormat(comment.createdAt)}</time>
                        </div>
                    </div>
                    <div className="py-4">
                        <p className="break-words bg-bright p-4 rounded text-sm font-semibold">{comment.message} </p>
                    </div>
                </div>
            ))}
        </div>
    )
}