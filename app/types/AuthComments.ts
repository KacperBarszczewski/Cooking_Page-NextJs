export type AuthComments = {
    email: string
    id: string
    image: string
    name: string
    Comment?: {
        id: string
        message: string
        createdAt: string
        published: boolean
        userId: string
        postId: string
    }[]
}