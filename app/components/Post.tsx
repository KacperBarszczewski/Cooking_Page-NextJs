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
        <Link href={`/post/${id}`} className="p-6 block w-[20rem] rounded-lg hover:shadow-primary hover:shadow-lg group  ">
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
        </Link>
    )
}