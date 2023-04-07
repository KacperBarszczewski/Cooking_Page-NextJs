"use client"

import Image from "next/image"
import DeleteComment from "../components/DeleteComment"

type EditProp = {
    id: string
    message: string
    published: boolean
    // userId: string
    // postId: string
}

export default function EditComment({id,message,published}:EditProp){

    return(
        <div className="bg-white my-8 p-4 rounded-lg">
            <div className="my-8">
                <h3>{message}</h3>
            </div>
            <div className="flex">
                <h3>{ published.toString()}</h3>
                <DeleteComment id={id}/>
            </div>
            
            
        </div>
    )

}