<script setup lang="ts">
  import { Button } from "@/components/ui/button"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { z } from "zod"
  import { toast } from "@/components/ui/toast"
  import type { Collection } from "~/types/collection"

  const formSchema = z.object({
    name: z.string(),
  })

  const submit = async (values: Collection) => {
    const { data } = await useFetch("/api/collection", {
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
    console.log(data)
  }
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        {{ $t("collection.create.fields.title") }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ $t("collection.create.fields.title") }}</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <AutoForm :schema="formSchema" @submit="submit">
        <Button type="submit"> Save changes </Button>
      </AutoForm>
    </DialogContent>
  </Dialog>
</template>
