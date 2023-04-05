import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if(!session||session.user.role!==Role.ADMIN){
        redirect('/')

        return(<></>)
    }


return(
    <main>
        <h1 className="text-2xl font-bold">Welcome back {session?.user?.role}</h1>
        <Link href={`/dashboard/admin/createPost`}>Create Post</Link>
    </main>
)
    
}