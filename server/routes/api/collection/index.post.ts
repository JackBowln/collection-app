import { prisma } from '@/prisma/db'
import openAiService from '~/server/service/openAiService';

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
  // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body

  const { name } = await readBody(event);

  try {
    const message = await openAiService(name)

    return message;
  }
  catch (error) {
    console.error(error);
  }
});
