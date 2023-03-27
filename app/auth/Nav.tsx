import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"

export default async function Nav() {
    const session = await getServerSession(authOptions)
    console.log(session)


    return (
        <nav className="flex justify-between items-center p-4">
            <Link href={"/"}>
                <h1 className="font-bold text-lg">Cooking Page</h1>
            </Link>
            <ul>
                <Login/>
            </ul>
        </nav>
    )
}