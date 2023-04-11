import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import EditPost from "./EditPost"

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
            <h1 className="text-2xl font-bold">Create Post</h1>
            <EditPost params={{ slug: url.params.slug }} />
        </main>
    )

}