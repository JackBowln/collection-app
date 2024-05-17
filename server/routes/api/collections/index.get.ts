import { prisma } from '@/prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
  const token = getCookie(event, 'auth.token')

  // const { email } = await readBody(event);

  try {
    const collections = await prisma.collection.findMany({
      where: {
        author: {
          sessions: {
            some: {
              sessionToken: token
            }
          }
        }
      }
    });

    return collections;
  }
  catch (error) {
    console.error(error);
  }
});
