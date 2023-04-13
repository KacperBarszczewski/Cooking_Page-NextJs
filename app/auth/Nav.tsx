import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import Logged from "./Logged";

export default async function Nav() {
    const session = await getServerSession(authOptions)

    return (
        <nav className="flex p-4 max-w-5xl mx-auto">
            <div className="basis-1/2 flex items-center">
                <Link href={"/"}>
                    <h1 className="font-extrabold text-lg sm:text-4xl text-primary">Cooking Page</h1>
                </Link>
            </div>
            <div className="basis-1/2 flex justify-end items-center">
                    {!session?.user && <Login />}
                    {session?.user && <Logged image={session.user?.image || ""} />}
            </div>


        </nav>
    )
}