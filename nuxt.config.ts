import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: ["@nuxthub/core", "@nuxt/eslint", "nuxtjs-naive-ui", "@nuxtjs/tailwindcss", "@nuxt/icon", "@vueuse/nuxt"],

  // https://devtools.nuxt.com
  devtools: { enabled: true },

  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      // Can be overridden by NUXT_PUBLIC_HELLO_TEXT environment variable
      helloText: "Hello from the Edge 👋",
    },
  },
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-07-30",

  nitro: {
    experimental: {
      tasks: true,
    },
  },

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    database: true,
    blob: true,
  },

  vite: {
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: false,
      },
    },
  },
})