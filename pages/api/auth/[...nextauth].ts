import NextAuth, { NextAuthOptions, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../prisma/client'
import 'next-auth/jwt'
import { Role } from "@prisma/client"
import Email from "next-auth/providers/email"
import EmailProvider from "next-auth/providers/email"

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    role: Role
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId
      role: Role
    }
  }
}

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_ID')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_SECRET')
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    error: '/login',
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        role: dbUser.role,
        email: dbUser.email,
        picture: dbUser.image,
      }
    }
  }

}

export default NextAuth(authOptions)
