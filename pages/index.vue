<template>
  <div class="page">
    <h1>My Blog</h1>
    <main>
      <p v-if="pending">
        <span class="loading"></span>
      </p>
      <p v-else-if="error">Error while fetching feed 💔</p>
      <div v-else>
        <Post class="post" v-for="post in feed" :key="post.id" :post="post" />
      </div>
      <!-- <button @click="signOut">signOut()</button> -->
      <Button>Click me</Button>
      {{ data }}
    </main>
  </div>
</template>

<script setup>
  let feed = ref([])
  const {
    status,
    data,
    token,
    getProviders,
    lastRefreshedAt,
    getSession,
    signUp,
    signIn,
    signOut,
  } = useAuth()
  const { pending, error } = await useLazyAsyncData(
    async () => {
      const getFeed = await fetch(`/feed`).then((res) => res.json())

      feed.value = getFeed
    },
    { server: false }
  )
  definePageMeta({
    middleware: "auth",
  })
</script>

<style>
  .post {
    background: white;
    transition: box-shadow 0.1s ease-in;
  }

  .post:hover {
    box-shadow: 1px 1px 3px #aaa;
  }

  .post,
  .post {
    margin-top: 2rem;
  }
</style>
