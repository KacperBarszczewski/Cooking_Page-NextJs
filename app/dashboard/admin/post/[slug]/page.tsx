import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import EditPost from "./EditPost"
import DeletePost from "./DeletePost"

type URL = {
    params: {
        slug: string
    }
}

export default async function Dashboard(url: URL) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== Role.ADMIN) {
        redirect('/')

        return (<></>)
    }


    return (
        <main>
            <h1 className="text-2xl font-bold">Edit Post</h1>
            <EditPost params={{ slug: url.params.slug }} />
            <h1 className="text-2xl font-bold">Delete Post</h1>
            <DeletePost id={url.params.slug} />
        </main>
    )

}