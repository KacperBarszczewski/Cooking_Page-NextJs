"use client"

import Image from "next/image"

type EditProp = {
    id: string
    message: string
    published: boolean
    // userId: string
    // postId: string
}

export default function EditComment({id,message,published}:EditProp){

    return(
        <div className="bg-white my-8 p-8 rounded-lg">
            <div>
                <h3>{message}</h3>
                <h3>{published}</h3>
            </div>
        </div>
    )

}