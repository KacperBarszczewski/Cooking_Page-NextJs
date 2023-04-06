'use client'

import Image from "next/image"
import Link from "next/link"

type Props = {
    id: string
    postTitle: string
    comments?: {}[]
    image?: string
}

export default function Post({ id, postTitle, comments, image }: Props) {
    return (
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <p className="font-semibold">{postTitle}</p>
            </div>
            { 
                image ? <Image width={200} height={200} src={image} alt="user image" className="rounded"/>:<div className="w-52 h-52"/>
            }

            
            <div>
                <Link href={`/post/${id}`}>{comments?.length} comments</Link>
            </div>

        </div>
    )
}