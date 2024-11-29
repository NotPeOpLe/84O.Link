<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch("/api", {
  query: { key: route.params.key },
})

if (data.value && data.value.file) {
  data.value.file.uploadedAt = new Date(
    data.value.file.uploadedAt
  ).toISOString()
}

if (!data.value) {
  throw createError({ statusCode: 404 })
}

if (data.value && data.value.type === "url") {
  await navigateTo(data.value?.target, { external: true })
}

function isBot() {
  const userAgent = useRequestHeader("User-Agent")
  if (!userAgent) return false
  return userAgent.includes("compatible")
}

if (
  import.meta.server &&
  isBot() &&
  !data.value.file?.customMetadata.disablePreview
) {
  await navigateTo("/files/" + data.value.target, { external: true })
}
</script>

<template>
  <ClientOnly>
    <PreviewCard v-if="data && data.file" :file="data.file" />
  </ClientOnly>
</template>
