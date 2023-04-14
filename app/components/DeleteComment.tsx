"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react"

type PostProps = {
    id: string
}

type DataProps = {
    commentId: string
}
export default function DeleteComment({ id }: PostProps) {

    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();

    const { mutate } = useMutation(
        async (data: DataProps) => {
            return axios.post('/api/posts/deleteComment', { data })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["detail-post"])
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
        mutate({ commentId: id })
    }

    return (

        <form onSubmit={submitComment} className="my-8">
            <button
                disabled={isDisabled}
                className="bg-error text-sm  text-background px-9 py-0.5 rounded-full disabled:opacity-25 hover:opacity-80"
                type="submit"
            >
                X
            </button>
        </form>

    )
}