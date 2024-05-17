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

  const schemaProps = ref([
    {
      name: "name",
      type: "string",
      optional: true,
      label: "Seu nome!",
      placeholder: "Seu nome!",
      is_email: false,
    },
    {
      name: "description",
      type: "number",
      optional: true,
      label: null,
      is_email: false,
    },
    {
      name: "is it?",
      type: "boolean",
      optional: true,
      label: "é isso mesm,o?",
      is_email: false,
    },
    {
      name: "dia",
      type: "date",
      optional: true,
      label: null,
      is_email: false,
    },
  ])

  const typeToZodSchema = {
    string: z.string,
    number: z.number,
    boolean: z.boolean,
    date: z.date,
  }

  const zodSchema = schemaProps.value.reduce((schema, prop) => {
    const zodType = typeToZodSchema[prop.type] || z.any
    if (!zodType) {
      throw new Error(`Unsupported type: ${prop.type}`)
    }

    let zodField = prop.optional ? zodType().optional() : zodType()
    return schema.extend({ [prop.name]: zodField })
  }, z.object({}))

  const submit = (data) => {
    console.log(data)
  }
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> {{ $t("collection.create.title") }} </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ $t("collection.create.title") }}</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <AutoForm :schema="zodSchema" @submit="submit">
        <button>click</button>
      </AutoForm>
      <DialogFooter>
        <Button type="submit"> Save changes </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
