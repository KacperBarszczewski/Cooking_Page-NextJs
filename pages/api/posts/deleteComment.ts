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



        try {
            const { commentId } = req.body.data;
            let result;

            if (session.user.role === Role.ADMIN) {
                result = await prisma.comment.deleteMany({ where: { id: commentId } })
            } else {
                result = await prisma.comment.deleteMany({ where: { id: commentId, userId: session.user.id } })
            }



            if (result.count === 0) {
                res.status(403).json({ err: "Not found" })
            } else {
                res.status(200).json(result)
            }

        } catch (err) {
            res.status(403).json({ err: "Error has occured while deleting a post" })
        }
    }
}