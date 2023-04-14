import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { redirect } from "next/navigation"
import Posts from "./Posts"


export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if(!session||session.user.role!==Role.ADMIN){
        redirect('/')

        return(<></>)
    }


return(
    <main className="max-w-5xl mx-auto my-5">
        <h1 className="text-2xl font-bold">Welcome back {session?.user?.role}</h1>
        <Link href={`/dashboard/admin/createPost`} className="inline-block bg-secondary text-primary text-sm px-9 py-0.5 rounded-full hover:opacity-90 hover:text-typography">Create Post</Link>
        <Posts/>
    </main>
)
    
}