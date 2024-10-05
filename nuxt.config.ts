// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@element-plus/nuxt", "nuxt-mongoose"],
  app: {
    head: {
      title: "NAOSI Quiz",
    },
  },
});
