// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/devtools', '@nuxt/image'],
    css: ["./app/main.css"],
  ui: {
    prefix: "Nuxt",
  },
})