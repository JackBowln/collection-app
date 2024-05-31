import { OpenAI } from "openai";

import { prisma } from '@/prisma/db'

// OpenAI initialization

//These arrays are to maintain the history of the conversation
const conversationContext = [];
const currentMessages = [];

// https://nuxt.com/docs/guide/directory-structure/server
export default async (collectionName: string) => {
  const openai = new OpenAI({
    apiKey: process.env.NUXT_OPENAI_API_KEY
  });
  // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant designed to output JSON." }, { role: "user", content: `do you like ${collectionName}?` }],
      model: "gpt-3.5-turbo-16k",
    });


    const messageContent = completion;
    return { message: messageContent };
  } catch (error) {
    console.error('Error with OpenAI API:', error.message);
    return { error: 'Failed to fetch response from OpenAI', details: error.message };
  }
};
