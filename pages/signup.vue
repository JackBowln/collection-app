<script setup lang="ts">
  import * as z from "zod"
  import { Button } from "@/components/ui/button"
  import { toast } from "@/components/ui/toast"
  import { AutoForm } from "@/components/ui/auto-form"
  import { useForm } from "vee-validate"
  import { toTypedSchema } from "@vee-validate/zod"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { UserRound } from "lucide-vue-next"

  const schema = z
    .object({
      image: z.string().optional(),
      name: z.string().optional(),
      email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
      password: z.string(),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords must match.",
      path: ["confirm"],
    })

  type Schema = Omit<z.output<typeof schema>, "confirm">
    
  async function onSubmit(values: Schema) {
    console.log(values)

    const { data } = await useFetch("/api/auth/local/register", {
      method: "POST",
      body: values,
    })
    toast({
      title: "You submitted the following values:",
      description: h(
        "pre",
        { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
        h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
      ),
    })
  }

  const form = useForm({
    validationSchema: toTypedSchema(schema),
  })

  definePageMeta({
    layout: "auth",
  })
</script>

<template>
  <AutoForm
    class="flex flex-col w-3/5 space-y-2"
    :schema
    :form
    :field-config="{
      image: {
        hideLabel: true,
        component: 'file',
      },
    }"
    @submit="onSubmit"
  >
    <template #image="slotProps">
      <label
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Profile pic
      </label>
      <div class="flex items-end space-x-2">
        <Avatar>
          <AvatarImage :src="form.values.image" alt="profile-picture" />
          <AvatarFallback><UserRound /></AvatarFallback>
        </Avatar>
        <AutoFormField v-bind="slotProps" class="w-full" />
      </div>
    </template>
    <Button type="submit"> Submit </Button>
    <div class="mt-4 text-sm text-center">
      have an account?
      <Button variant="ghost">
        <NuxtLink to="/login" class="underline"> Log in </NuxtLink>
      </Button>
    </div>
  </AutoForm>
</template>
