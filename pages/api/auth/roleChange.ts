import prisma from "../../../prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Role } from "@prisma/client";

export default async function roleChange(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(401).json({ message: "Please sign in" })
        }

        try {
            const result = await prisma.user.update({
                where: {
                    id: session.user.id
                },
                data: {
                    role: session.user.role == Role.ADMIN ? Role.USER : Role.ADMIN
                }
            })
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({ err: "Error on making a post" })
        }
    }
}