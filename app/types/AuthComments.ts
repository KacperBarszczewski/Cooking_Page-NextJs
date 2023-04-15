import { Role } from "@prisma/client"

export type AuthComments = {
    email: string
    id: string
    image?: string
    name?: string
    role: Role
    comments?: {
        id: string
        message: string
        createdAt: string
        published: boolean
        userId: string
        postId: string
    }[]
}