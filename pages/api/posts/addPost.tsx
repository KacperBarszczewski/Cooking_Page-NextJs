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

        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email || ""}
        })

        const title: string = req.body.title;
        const image: string = req.body.img;
        const content: string = req.body.content;
        const ingredients: string[] = req.body.ingredients;



        if (title.length > 100)
            return res.status(403).json({ message: "Please write a shorter title" })

        if (!title.length)
            return res.status(403).json({ message: "Title can't be empty" })

        try {
            const result = await prisma.post.create({
                data: {
                    title,
                    image,
                    content,
                    ingredients,
                    userId: prismaUser?.id,
                }
            })
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({ err: "Error on making a post" })
        }
    }
}