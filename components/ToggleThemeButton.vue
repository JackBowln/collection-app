<template>
  <Button @click="setTheme" >
    <MoonStar v-if="colorMode.preference === 'dark'" />
    <Sun v-else class="text-black hover:text-white"/>
  </Button>
</template>

<script setup lang="ts">
  import { MoonStar, Sun } from "lucide-vue-next"
  import {
    Button,
  } from "@/components/ui/button"
  const { colorMode, setTheme } = useTheme()
</script>

<style scoped></style>
