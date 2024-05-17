import { en } from "@/i18n/en";
import { pt } from "@/i18n/pt";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
      ...pt   
    },
    pt: {
      welcome: 'bem-vindo',
      ...en
    }
  }
}))
