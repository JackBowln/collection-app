<template>
  <div
    class="w-full lg:grid h-dvh lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]"
  >
    <div class="flex items-center justify-center py-12">
      <slot />
    </div>
    <div class="hidden bg-muted lg:block">
      <div class="absolute z-20 top-4 left-4">
        <Select v-model="locale">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup v-for="locale in locales">
              <SelectItem :value="locale.code">
                {{ locale.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <!-- <Button @click="setTheme" class="absolute z-20 top-4 right-4">
        <MoonStar v-if="colorMode.preference === 'dark'" />
        <Sun v-else />
      </Button> -->
      <ToggleThemeButton class="absolute z-20 top-4 right-4" />
      <NuxtImg
        src="/assets/background.jpg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { locale, locales, setLocale } = useI18n()
  watch(locale, (e) => setLocale(e))
</script>

<style scoped></style>
