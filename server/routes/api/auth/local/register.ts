import { z } from 'zod'
import { prisma } from "@/prisma/db"
import { Validator } from "#nuxt-server-utils";
import bcrypt from "bcrypt"
// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body

  const schema = z.object({
    image: z.string().optional(),
    name: z.string({ message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8, { message: 'Must be at least 8 characters' })
  })

  const { name, email, password, image } = await readBody(event);
  
  Validator.validateSchema(schema, { name, email, password, image });
  try {

    let hashPassword = bcrypt
      .hashSync(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashPassword, image }
    })
    return {
      name,
      email
    }
  } catch (err) {

    throw createError({
      statusCode: 404,
      message: err,
      statusMessage: "Not Found",
    })
  }

});
