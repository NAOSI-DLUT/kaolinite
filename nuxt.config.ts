// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@element-plus/nuxt", "nuxt-monaco-editor", "nuxt-mongoose"],
  devtools: { enabled: true },
  monacoEditor: {
    locale: "zh-hans",
  },
  ssr: false,
  app: {
    head: {
      title: "NAOSI Quiz",
    },
  },
});
