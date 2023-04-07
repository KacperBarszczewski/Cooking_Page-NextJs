"use client"

import { PostType } from "@/app/types/Post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"

const allPosts = async () => {
    const response = await axios.get("/api/posts/getPosts")
    return response.data
}

type Props = {
    id: string
    postTitle: string
    comments?: {}[]
    image?: string
}

function Post({ id, postTitle, comments, image }: Props) {
    return (
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <p className="font-semibold">{postTitle}</p>
            </div>
            {
                image ? <Image width={200} height={200} src={image} alt="user image" className="rounded" /> : <div className="w-52 h-52" />
            }


            <div>
                <Link href={`/dashboard/admin/post/${id}`}>{comments?.length} comments</Link>
            </div>
            <div>
                <Link href={`/dashboard/admin/post/${id}`}> EDIT </Link>
            </div>


        </div>
    )
}

export default function Posts() {

    const { data, error, isLoading } = useQuery<PostType[]>({ queryFn: allPosts, queryKey: ["posts"], })

    if (isLoading) {
        return <>"Loading..."</>
    }
    if (error) {
        return <>"error"</>
    }


    return (
        <div>
            {data?.map((post) => (
                <Post key={post.id} id={post.id} postTitle={post.title} comments={post.comments} image={post.image} />
            ))}
        </div>


    )

}