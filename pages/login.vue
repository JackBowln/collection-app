<script setup lang="ts">
  import { Button } from "@/components/ui/button"
  import { Github, Mail } from "lucide-vue-next"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import * as z from "zod"
  import { toast } from "@/components/ui/toast"
  import { AutoForm } from "@/components/ui/auto-form"
  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    // password: z.string(),
  })

  type Schema = typeof schema
  const { signIn } = useAuth()
  function onSubmit(values: Record<string, Schema>) {
    signIn("email", values, { callbackUrl: "/" }).then(() => {
      toast({
        title: "You submitted the following values:",
        description: h(
          "pre",
          { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
          h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
        ),
      })
    })
  }
  // const email = ref("")
  // const phone = ref("")
  // const password = ref("")
  // const { signIn } = useAuth()
  // const credentials = ref({
  //   email: "",
  //   password: "",
  // })
  // async function signInWithCredentials() {
  //   // Probably you'll do some validation here before submitting to the backend
  //   // ...
  //   // This is the object that our backend expects for the `signIn` endpoint
  //   try {
  //     // This sends a POST request to the `auth.provider.endpoints.signIn` endpoint with `credentials` as the body
  //     await signIn(credentials.value, { callbackUrl: "/" })
  //     alert("Successfully logged in!")
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // async function register() {
  //   const { data } = await useFetch("/api/auth/register", {
  //     method: "POST",
  //     body: { name: "teste5", email: "5321@123.com", password: "abcdabcd" },
  //   })
  //   console.log(data)
  // }
  const googleAuth = async () => {
    await signIn("google", { callbackUrl: "/" })
  }
  const githubAuth = async () => {
    await signIn("github", { callbackUrl: "/" })
  }

  definePageMeta({
    layout: "auth",
  })
</script>
<template>
  <!-- <h1>{{ $t("welcome") }}</h1> -->
  <Card class="max-w-sm mx-auto">
    <CardHeader>
      <CardTitle class="text-2xl">Login</CardTitle>
      <CardDescription>
        Enter your email to to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <AutoForm class="flex flex-col space-y-2" :schema @submit="onSubmit">
          <Button type="submit" class="w-full">
            <Mail class="mr-2 size-4" /> Send mail
          </Button>
        </AutoForm>
        <Button variant="outline" class="w-full" @click="googleAuth">
          Login with Google
        </Button>
        <Button variant="outline" class="w-full" @click="githubAuth">
          <Github class="mr-2 size-4" /> Login with Github
        </Button>
      </div>
      <div class="mt-4 text-sm text-center">
        Don't have an account?
        <Button variant="ghost">
          <NuxtLink to="/signup" class="underline"> Sign up </NuxtLink>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
