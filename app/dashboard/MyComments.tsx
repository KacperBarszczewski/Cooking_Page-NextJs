'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthComments } from "../types/AuthComments"
import EditComment from "./EditComment"


const fetchAuthComments = async () => {
    const response = await axios.get("/api/posts/authComments")
    return response.data
}

export default function MyComments() {

    const { data, isLoading } = useQuery<AuthComments>({ queryFn: fetchAuthComments, queryKey: ["auth-comments"] })

    if (isLoading) return <h1>Comments are loading...</h1>

    console.log(data)

    return (
        <div>
            {data?.comments?.map((comment) => (
                <EditComment
                    key={comment.id}
                    id={comment.id}
                    message={comment.message}
                    published={comment.published}
                />
            ))}
        </div>
    )
}