<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  import { Primitive, type PrimitiveProps } from "radix-vue"
  import { type ButtonVariants, buttonVariants } from "./index"
  import { cn } from "../../../lib/utils"
  import { LoaderCircle } from "lucide-vue-next"

  type Props = {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: HTMLAttributes["class"]
    isLoading?: boolean
  }

  const props = defineProps<Props>()
</script>

<template>
  <Primitive
    as="button"
    :as-child="false"
    :class="
      cn(
        buttonVariants({
          variant,
          size,
        }),
        props.class
      )
    "
  >
    <LoaderCircle class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
    <slot />
  </Primitive>
</template>
