export type PostType = {
    title: string
    id: string
    image?: string
    published: boolean
    createdAt: string
    comments?: {
        createdAt: string
        id: string
        postId: string
        userId: string
    }[]
}