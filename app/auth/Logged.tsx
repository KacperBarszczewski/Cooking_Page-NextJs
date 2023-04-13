"use client"

import { signOut } from "next-auth/react"

import Link from "next/link"
import Image from "next/image"

type Props = {
    image: string
}

export default function Logged({ image }: Props) {
    return (
        <div className="flex gap-5 items-center">
            <button
                onClick={() => signOut()}
                className="bg-primary text-sm  text-background px-4 py-0.5 rounded-full disabled:opacity-25"
            >
                Sign out
            </button>
            <Link href={"/dashboard"}>
                <Image className="rounded-full w-10 border-2 border-primary" width={64} height={64} src={image} alt="user image" priority />
            </Link>
        </div>

    )
}