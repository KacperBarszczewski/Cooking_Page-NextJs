'use client'

import Link from "next/link"

type Props = {
    id: string
    postTitle: string
    comments?: {}[]
}

export default function Post({id,postTitle,comments}:Props){
    return(
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <p className="font-semibold">{postTitle}</p>
            </div>
            <div>
                <Link href={`/post/${id}`}>{comments?.length} comments</Link>
            </div>

        </div>
    )
}