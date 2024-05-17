import { prisma } from "@/prisma/db"

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
  let token: any = getCookie(event, 'auth.token')

  try {
    const tokenData = await prisma.verificationToken.findUnique({
      where: {
        token
      }
    })
    const account = await prisma.account.findFirst({
      where: {
        userId: tokenData.userId,
      },
      include: {
        user: true,
        token: true
      }
    })

    
    return {
      accessToken: tokenData.token,
      ...account
    }
  } catch (err) {

    throw createError({
      statusCode: 404,
      message: err,
      statusMessage: "Not Found",
    })
  }
});
