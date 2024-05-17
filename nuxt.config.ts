export default defineNuxtConfig({
  // Disable strict
  typescript: {
    strict: false
  },
  css: ['~/index.css'],
  app: {
    head: {
      title: 'Collection',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  runtimeConfig: {
    secretKey: `UhfYqmlzVkG7op0hOS0DJlpbjDpHgGpzUJZR+Q==dmUNibndmHIziYOc6Un55UWq`,
  },
  auth: {
    baseURL: "/api/auth",
    provider: {
      type: 'authjs',
    }
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  modules: [
    "@sidebase/nuxt-auth",
    'nuxt-server-utils',
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    '@nuxtjs/color-mode',
    "@nuxt/image",
    "@nuxtjs/i18n"
  ],
  i18n: {
    strategy: 'no_prefix',
    vueI18n: './i18n/i18n.config.ts',
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'pt',
        name: 'Português'
      }
    ]
  }
});
