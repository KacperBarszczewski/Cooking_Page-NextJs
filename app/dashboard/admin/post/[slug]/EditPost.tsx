"use client"

import { PostType } from "@/app/types/Post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react"

type URL = {
    params: {
        slug: string
    }
}

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function EditPost(url: URL) {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const [isWasSend, setIsWasSend] = useState(false);


    const { data, isError, isLoading } = useQuery<PostType>({
        queryKey: ["editDetail-post"],
        queryFn: () => fetchDetails(url.params.slug)
    })

    if (isError) {
        return <>Error..</>
    }


    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setImg(data.image || "")
            setContent(data.content || "")
            setIngredients(data.ingredients)
            setIsDisabled(false)
        }
    }, [data])

    useEffect(() => {
        if (isWasSend) {
            redirect('/dashboard/admin')
        }
    }, [isWasSend])

    const { mutate } = useMutation(
        async () => await axios.post('/api/posts/editPost', { postId: url.params.slug, title, img, content, ingredients }),
        {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"])
                setIsDisabled(false)
                setIsWasSend(true)
            }
        }
    )


    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        mutate();
    }

    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const data = new FileReader();
        data.addEventListener(`load`, () => {
            setImg(data.result as string);
        });
        data.readAsDataURL(e.target.files![0]);
    };

    const handleClick = () => {
        hiddenFileInput.current?.click();
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

                <input type="file" accept="image/*" ref={hiddenFileInput} onChange={handleImgChange} className="hidden" />
                <button type="button" onClick={handleClick}>Upload a image</button>

                <textarea
                    className="p-4 text-lg rounded-md my-2 bg-gray-200"
                    onChange={(e) => setContent(e.target.value)}
                    name="content"
                    value={content}
                    placeholder="Content"
                ></textarea>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIngredients(currentIngredients => [...currentIngredients, ""])
                        }} >Add now ingredient
                    </button>

                    {ingredients.map((item, i) => {
                        return (
                            <div key={i}>
                                <input
                                    value={item}
                                    placeholder="Add ingredient"
                                    onChange={
                                        (e) => {
                                            const item = e.target.value;
                                            setIngredients((currentItems) => currentItems.map((x, l) => l === i ? item : x))
                                        }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIngredients(currentIngredients => currentIngredients.filter((x, l) => l !== i))
                                    }} >X
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <button
                    className="py-2 bg-gray-500 text-sm  text-gray-100 p-3 rounded disabled:opacity-25"
                    disabled={isDisabled}
                    type="submit"
                >
                    Edit post
                </button>
            </div>

        </form>

    )
}