"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"

type PostProps = {
    id: string
}

type DataProps = {
    postId: string
}
export default function DeletePost({ id }: PostProps) {

    const [isWasSend, setIsWasSend] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isWasSend) {
            redirect('/dashboard/admin')
        }
    }, [isWasSend])

    const { mutate } = useMutation(
        async (data: DataProps) => {
            return axios.post('/api/posts/deletePost', { postId:data.postId})
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"])
                setIsWasSend(true)
            },
            onError: (error) => {
                setIsDisabled(false)
                if (error instanceof AxiosError) {
                    console.log(error?.response?.data.message)
                }
            }

        }
    )

    const submitDeletePost = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        mutate({ postId: id })
    }

    return (

        <form onSubmit={submitDeletePost} className="my-8">
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