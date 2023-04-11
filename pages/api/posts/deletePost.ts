import prisma from "../../../prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Role } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(401).json({ message: "Please sign in" })
        }
        if (session.user.role!==Role.ADMIN) {
            return res.status(401).json({ message: "You must be ADMIN" })
        }

        const id: string = req.body.postId;
        console.log("delete post id: "+req.body.postId)

        try {
            const result = await prisma.post.delete({
                where: {
                    id
                }
            })
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({ err: "Error on delete a post" })
        }
    }
}