import { z } from 'zod'
import { prisma } from "@/prisma/db"
import { Validator } from "#nuxt-server-utils";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
  const runtimeConfig = useRuntimeConfig()

  const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8, { message: 'Must be at least 8 characters' })
  })

  const { email, password } = await readBody(event);

  Validator.validateSchema(schema, { email, password });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    })
    let hashPassword = bcrypt
      .compareSync(password, user.password)

    if (hashPassword) {
      const expiresIn = 60 * 60 // 1 hour
      var token = jwt.sign({ password }, runtimeConfig.secretKey, { algorithm: 'HS512', expiresIn });

      const verificationToken = await prisma.verificationToken.create({
        data: {
          token,
          expiresIn: 3600,
          user: {
            connect: user
          }

        }
      })

      await prisma.account.create({
        data: {
          token: {
            connect: {
              id: verificationToken.id
            }
          },
          user: {
            connect: {
              id: user.id
            }
          }

        }
      })

      return {
        token: {
          accessToken: token
        }
      }
    }
  } catch (err) {

    throw createError({
      statusCode: 404,
      message: err,
      statusMessage: "Not Found",
    })
  }
});
