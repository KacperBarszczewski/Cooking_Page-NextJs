"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react"

type PostProps = {
    id?: string
}

type Comment = {
    postId?: string
    title: string
}
export default function AddComment({ id }: PostProps) {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();

    const { mutate } = useMutation(
        async (data: Comment) => {
            return axios.post('/api/posts/addComment', { data })
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["detail-post"])
                setTitle("")
                setIsDisabled(false)
                
            },
            onError: (error) => {
                setIsDisabled(false)
                if (error instanceof AxiosError) {
                    console.log(error?.response?.data.message)
                }
            }

        }
    )

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        mutate({ title, postId: id })
    }

    return (

        <form onSubmit={submitComment} className="my-8 mx-5">
            <h3 className="font-bold text-lg">Comments</h3>
            <div className="flex flex-col my-2">
                <textarea 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    name="title"
                    className="p-4 h-36 rounded-md resize-y bg-bright border-2 border-secondary text-sm font-semibold"
                />
            </div>
            <div className="flex items-center gap-2">
                <button
                    disabled={isDisabled}
                    className="bg-primary text-sm  text-background p-3 rounded-lg disabled:opacity-25"
                    type="submit"
                >
                    Add Comment
                </button>
                <p
                    className={`font-bold ${title.length > 300 ? "text-red-700" : "text-gray-400"}`}
                >
                    {`${title.length}/300`}
                </p>
            </div>
        </form>

    )
}