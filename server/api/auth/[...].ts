import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { prisma } from "@/prisma/db"
import { PrismaAdapter } from '@auth/prisma-adapter'

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  pages: {
    signIn: '/login',
  },
  secret: process.env.NUXT_SECRET_TOKEN,
  adapter: PrismaAdapter(prisma),
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider.default({
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET
    }),
    EmailProvider.default({
      server: {
        host: "smtp.gmail.com",
        port: "587",
        auth: {
          user: process.env.NUXT_EMAIL_AUTH,
          pass: process.env.NUXT_EMAIL_PASSWORD
        }
      },
      from: process.env.NUXT_EMAIL_AUTH
    }),
    // CredentialsProvider.default({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
      // adapter: PrismaAdapter(prisma),
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.

    //   credentials: {
    //     email: { label: 'Email', type: 'text', placeholder: '(hint: jsmith)' },
    //     password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
    //   },
    //   async authorize(credentials: any) {
    //     // You need to provide your own logic here that takes the credentials
    //     // submitted and returns either a object representing a user or value
    //     // that is false/null if the credentials are invalid.
    //     // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: credentials.email,
    //       },
    //     })
    //     let hashPassword = bcrypt
    //       .compareSync(credentials.password, user.password)


    //     // const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2' }
    //     if (hashPassword) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user
    //     } else {
    //       // eslint-disable-next-line no-console
    //       console.error('Warning: Malicious login attempt registered, bad credentials provided')
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null
    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   }
    // })
  ]
})
