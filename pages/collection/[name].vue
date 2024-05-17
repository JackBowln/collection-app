<template>
  <div>
    {{ name }}
  </div>
</template>

<script setup lang="ts">
  const {
    params: { name },
  } = useRoute()
</script>

<style scoped></style>
