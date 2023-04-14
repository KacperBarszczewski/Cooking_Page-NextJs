import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MyComments from "./MyComments";
import Link from "next/link";
import { Role } from "@prisma/client";


export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/api/auth/signin')
    }

    return (
        <main className="max-w-5xl mx-auto my-5">
            <h1 className="text-2xl font-bold">Welcome back {session?.user?.name}</h1>
            {
                session.user.role === Role.ADMIN ? <Link href={`/dashboard/admin`} className="inline-block bg-secondary text-primary text-sm px-9 py-0.5 rounded-full hover:opacity-90 hover:text-typography"> Admin panel</Link> : null
            }

            <MyComments />
        </main>
    )

}