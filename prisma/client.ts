// import { PrismaClient } from '@prisma/client'

// const client = globalThis.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client

// export default client

import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma