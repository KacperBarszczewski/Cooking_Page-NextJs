export type PostType = {
    title: string
    id: string
    createdAt: string
    comments?: {
        createdAt: string
        id: string
        postId: string
        userId: string
    }[]
}