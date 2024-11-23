<script setup lang="ts">
import { NConfigProvider, useOsTheme, darkTheme } from "naive-ui"
import hljs from "highlight.js/lib/core"

const osThemeRef = useOsTheme()
const theme = computed(() => (osThemeRef.value === "dark" ? darkTheme : null))
</script>

<template>
  <NConfigProvider :hljs="hljs" :theme="theme">
    <NGlobalStyle />
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NConfigProvider>
</template>
