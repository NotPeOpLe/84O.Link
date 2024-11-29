<script setup lang="ts">
import {
  NConfigProvider,
  useOsTheme,
  darkTheme,
  NMessageProvider,
} from "naive-ui"
import hljs from "highlight.js/lib/core"

const osThemeRef = useOsTheme()
const theme = computed(() => (osThemeRef.value === "dark" ? darkTheme : null))
</script>

<template>
  <NConfigProvider :hljs="hljs" :theme="theme">
    <NMessageProvider>
      <NGlobalStyle />
      <NuxtRouteAnnouncer />
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>
