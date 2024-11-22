<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch("/api", {
  query: { key: route.params.key },
})

if (data.value && data.value.type === "url") {
  await navigateTo(data.value?.target, { external: true })
}
</script>

<template>
  <div>{{ data }}</div>
</template>
