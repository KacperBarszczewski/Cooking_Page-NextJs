import prisma from "../../../prisma/client"
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {

        try {
            const data = await prisma.post.findMany({
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(403).json({ err: "Error fetching posts" })
        }
    }
}