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
        <Link href={`/post/${id}`} className="p-6 block w-[20rem]">
            <div>
                {
                    image ? <Image className="object-cover h-36 w-[20rem] rounded" width={200} height={200} src={image} alt={postTitle + " image"} /> : <div className="w-52 h-52" />
                }
            </div>
            <div>
                <h2 className="font-semibold">{postTitle}</h2>
            </div>
            <div className="text-xs text-primary">
                {comments?.length} comments
            </div>
        </Link>
    )
}