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
                className="text-sm bg-red-500 text-white p-2"
                type="submit"
            >
                X
            </button>
        </form>

    )
}