"use client"

import Image from "next/image"
import DeleteComment from "../components/DeleteComment"

type EditProp = {
    id: string
    message: string
    date: string
}

const dateFormat = (date: string | undefined) => {
    if (date) {
        const date2 = new Date(date);
        return date2.toLocaleString().slice(0, 17);
    }

}

export default function EditComment({ id, message, date }: EditProp) {

    return (
        <div className=" my-8 p-4 rounded-lg border-primary border bg-bright">
            <div className="flex items-center gap-2">
                <p>Created at:</p>
                <time className="text-[0.7rem]">{dateFormat(date)}</time>
            </div>
            <div className="">
                <p className="break-words bg-background p-4 rounded-lg text-sm font-semibold">{message}</p>
            </div>
            <div className="flex place-items-center gap-5">
                <DeleteComment id={id} />
            </div>


        </div>
    )

}