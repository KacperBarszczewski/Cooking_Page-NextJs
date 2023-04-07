"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react"

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [img, setImg] = useState("");
    const queryClient = useQueryClient();

    const { mutate } = useMutation(
        async (title: string) => await axios.post('/api/posts/addPost', { title, img }),
        {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["posts"])
                console.log(data)
                setTitle("")
                setImg("")
                setIsDisabled(false)
            }
        }
    )


    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        mutate(title);
    }

    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const data = new FileReader();
        data.addEventListener(`load`, () => {
            setImg(data.result as string);
        });
        data.readAsDataURL(e.target.files![0]);
    };

    return (
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea
                    className="p-4 text-lg rounded-md my-2 bg-gray-200"
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    value={title}
                    placeholder="Title"
                ></textarea>
                {
                    img ? <Image width={200} height={200} src={img} alt="user image" className="rounded" /> : <div className="w-52 h-52" />
                }
                <input type="file" onChange={handleImgChange} />
            </div>
            <div>
                <button
                    className="py-2 bg-gray-500 text-sm  text-gray-100 p-3 rounded disabled:opacity-25"
                    disabled={isDisabled}
                    type="submit"
                >
                    Create post
                </button>
            </div>

        </form>

    )
}