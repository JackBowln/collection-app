<template>
  <CreateCollectionButton />
  <div v-for="collection in collections" :key="collection.id">{{ collection }}</div>
</template>

<script setup lang="ts">
  import type { Collection } from "@prisma/client/edge"
  const collections = ref<Partial<Collection[]>>()
  async function getCollections() {
    const { data } = await useFetch<Partial<Collection[]>>("/api/collections")
    collections.value = data.value
  }

  getCollections()
</script>

<style scoped></style>
