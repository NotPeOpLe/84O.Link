<script setup lang="ts">
import {
  NConfigProvider,
  useOsTheme,
  darkTheme,
  NMessageProvider,
  NModalProvider,
} from "naive-ui"
import hljs from "highlight.js/lib/core"

const osThemeRef = useOsTheme()
const theme = computed(() => (osThemeRef.value === "dark" ? darkTheme : null))
</script>

<template>
  <NConfigProvider :hljs="hljs" :theme="theme">
    <NMessageProvider>
      <NModalProvider>
        <NGlobalStyle />
        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator />
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </NModalProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
