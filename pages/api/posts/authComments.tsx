import prisma from "../../../prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(401).json({ message: "Please sign in" })
        }

        try {
            const data = await prisma.user.findUnique({
                where: {
                    email: session.user?.email || "",
                },
                include: {
                    Comment: {
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            })

            res.status(200).json(data)
        } catch (err) {
            res.status(403).json({ err: "Error on geting posts" })
        }
    }
}