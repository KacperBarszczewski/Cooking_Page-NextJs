'use client'

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    role: string
}

export default function ChangeRoleButton({ role }: Props) {

    const [isDisabled, setIsDisabled] = useState(false);
    const router = useRouter();


    const { mutate } = useMutation(
        async () => {
            return axios.post('/api/auth/roleChange')
        },
        {
            onSuccess: () => {
                router.refresh();
            },
            onError: (error) => {
                setIsDisabled(false)
                if (error instanceof AxiosError) {
                    console.log(error?.response?.data.message)
                }
            }

        }
    )

    const submitReq = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        mutate()
    }

    return (
        <button
            onClick={submitReq}
            disabled={isDisabled}
            className="mr-4 bg-secondary text-primary text-sm px-9 py-0.5 rounded-full hover:opacity-90 hover:text-typography"
        >
            Change role to {role}
        </button>)
}