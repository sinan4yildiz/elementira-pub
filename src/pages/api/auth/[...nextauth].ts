import { env, routes } from '@constants/index'
import { UserSchemaInterface } from '@models/userModel'
import { UserRepository } from '@repository/index'
import { HydratedDocument } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { getToken, JWT } from 'next-auth/jwt'
import { BuiltInProviderType } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

let currentToken: JWT | null

export const authOptions: NextAuthOptions = {
   session: {
      strategy: 'jwt'
   },
   providers: [
      CredentialsProvider({
         type: 'credentials',
         credentials: {},
         async authorize(credentials) {
            const { email, password } = credentials as {
               email: string
               password: string
            }

            const userRepo = new UserRepository()

            const userVerified = (await userRepo.verifySignIn(email, password)) as HydratedDocument<UserSchemaInterface>

            if (!userVerified) {
               throw new Error()
            }

            return {
               id: userVerified.id,
               email: userVerified.email,
               name: userVerified.fullName
            }
         }
      }),
      {
         id: 'updateSession',
         name: 'updateSession',
         type: 'credentials',
         credentials: {},
         async authorize() {
            const userRepo = new UserRepository()
            const user = await userRepo.find({ _id: currentToken?.sub })

            if (!user) {
               throw new Error()
            }

            return {
               id: user.id,
               email: user.email,
               name: user.fullName
            }
         }
      },
      GoogleProvider({
         clientId: env.private.GOOGLE_CLIENT_ID as string,
         clientSecret: env.private.GOOGLE_CLIENT_SECRET as string
      }),
      FacebookProvider({
         clientId: env.private.FACEBOOK_CLIENT_ID as string,
         clientSecret: env.private.FACEBOOK_CLIENT_SECRET as string
      })
      /*TwitterProvider({
         clientId: env.private.TWITTER_CLIENT_ID as string,
         clientSecret: env.private.TWITTER_CLIENT_SECRET as string,
         version: '2.0'
      }),
      AppleProvider({
         clientId: env.private.APPLE_ID as string,
         clientSecret: env.private.APPLE_SECRET as string
      })*/
   ],
   secret: env.private.NEXTAUTH_SECRET,
   pages: {
      signIn: routes.page.account.signIn
   },
   callbacks: {
      jwt({ token }) {
         return token
      },
      async signIn({ user, account }) {
         if (account?.type !== 'credentials') {
            const userRepo = new UserRepository()

            if (!user.name || !user.email) {
               return `${routes.page.account.signUp}?error=missingDetails`
            }

            const existing = await userRepo.getUserByEmail(user.email as string)

            if (existing) {
               user.id = existing._id as never
               user.email = existing.email
               user.name = existing.fullName

               return true
            }

            const created = await userRepo.create({
               fullName: user.name as string,
               email: user.email as string,
               password: Math.random().toString(36).slice(2),
               provider: account?.provider as BuiltInProviderType,
               providerAccountId: account?.providerAccountId as string
            })

            user.id = created._id as never
         }

         return true
      }
   }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   currentToken = await getToken({ req, secret: authOptions.secret })

   return NextAuth(req, res, authOptions)
}

export default handler
