

import { useState } from "react"

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    return (
        <form className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea
                    className="p-4 text-lg rounded-md my-2 bg-gray-200"
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    value={title}
                    placeholder="Title"
                ></textarea>
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