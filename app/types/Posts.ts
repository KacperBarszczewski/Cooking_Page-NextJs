export type PostType = {
    title: string
    id: string
    createdAt: string
    Comment?: {
        createdAt: string
        id: string
        postId: string
        userId: string
    }[]
}