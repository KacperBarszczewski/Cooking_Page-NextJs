import { Role } from "@prisma/client"

export type PostType = {
    id: string
    title: string
    image?: string
    content?: string
    ingredients: string[]
    published: boolean
    updatedAt?: string
    user: {
        email: string
        id: string
        image: string
        name: string
        role: Role
    }
    comments: {
        createdAt?: string
        id: string
        postId: string
        message: string
        userId: string
        user: {
            email: string
            id: string
            image: string
            name: string
            role: Role
        }
    }[]
}