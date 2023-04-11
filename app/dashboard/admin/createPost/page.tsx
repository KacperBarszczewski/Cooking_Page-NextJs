import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import AddPost from "./AddPost"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if(!session||session.user.role!==Role.ADMIN){
        redirect('/')

        return(<></>)
    }


return(
    <main>
        <h1 className="text-2xl font-bold">Create Post</h1>
        <AddPost />
    </main>
)
    
}