"use client"

import { signOut } from "next-auth/react"

import Link from "next/link"
import Image from "next/image"

type Props = {
    image: string
}

export default function Logged({ image }: Props) {
    return (
        <li className="flex gap-6 items-center">
            <button
                onClick={() => signOut()}
                className="bg-gray-500 text-sm  text-gray-100 p-3 rounded disabled:opacity-25"
            >
                Sign out
            </button>
            <Link href={"/dashboard"}>
                <Image className="rounded-full w-11" width={64} height={64} src={image} alt="user image" priority />
            </Link>
        </li>

    )
}