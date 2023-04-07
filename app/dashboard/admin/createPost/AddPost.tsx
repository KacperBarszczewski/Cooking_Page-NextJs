"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { MouseEventHandler, useRef, useState } from "react"

export default function CreatePost() {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");
    const [ingredients, setIngredients] = useState(["pomidor", "cebula"]);


    const { mutate } = useMutation(
        async (title: string) => await axios.post('/api/posts/addPost', { title, img, content, ingredients }),
        {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["posts"])
                console.log(data)
                setTitle("")
                setImg("")
                setContent("")
                setIngredients([])
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
                    Create post
                </button>
            </div>

        </form>

    )
}