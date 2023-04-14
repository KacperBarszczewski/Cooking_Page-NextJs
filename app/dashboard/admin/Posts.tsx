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
        <Link href={`/dashboard/admin/post/${id}`} className="p-6 block w-[20rem] rounded-lg hover:shadow-primary hover:shadow-lg group  ">
            
            <div className="relative">
                {
                    image ? <Image className="object-cover h-36 w-[17rem] rounded-lg" width={200} height={200} src={image} alt={postTitle + " image"} /> : <div className="h-36 w-[17rem] flex justify-center items-center"> No Image</div>

                }
                <div className="absolute bottom-0 left-0 right-0 h-36 w-[17rem] rounded-lg group-hover:shadow-[inset_30px_0px_25px_#E58A2F,inset_-30px_0px_25px_#E58A2F]"></div>
            </div>
            <div>
                <h2 className="font-semibold">{postTitle}</h2>
            </div>
            <div className="text-xs text-primary">
                {comments?.length} comments
            </div>
            <h3 className="text-sm font-bold">Edit</h3>
        </Link>
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
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold border-b-4 border-secondary text-primary">Edit</h2>
            {data?.map((post) => (
                <Post key={post.id} id={post.id} postTitle={post.title} comments={post.comments} image={post.image} />
            ))}
        </div>


    )

}