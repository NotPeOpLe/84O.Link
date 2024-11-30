<script setup lang="ts">
import type { LinkObjectWithURL } from "~~/server/utils/types"

const route = useRoute()
const { data } = await useFetch<LinkObjectWithURL>("/api", {
  query: { key: route.params.key },
})

if (!data.value) {
  throw createError({ statusCode: 404 })
}

if (data.value.type === "url") {
  await navigateTo(data.value?.target, { external: true })
}

if (
  import.meta.server &&
  !data.value.file?.customMetadata.disablePreview &&
  isBot()
) {
  await navigateTo("/files/" + data.value.target, { external: true })
}
</script>

<template>
  <PreviewCard v-if="data && data.file" :file="data.file" />
</template>
