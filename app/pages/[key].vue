<script setup lang="ts">
import { NImage, NTag } from "naive-ui"

const route = useRoute()
const { data } = await useFetch("/api", {
  query: { key: route.params.key },
})

if (data.value && data.value.type === "url") {
  await navigateTo(data.value?.target, { external: true })
}

const formatSize = (size: number) => {
  const units = ["Bytes", "KB", "MB", "GB", "TB"]
  let index = 0
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }
  return `${size.toFixed(2)} ${units[index]}`
}

const size = computed(() => formatSize(data.value?.file?.size || 0))
</script>

<template>
  <NFlex align="center" justify="center" class="h-screen" vertical>
    <!-- <pre class="">{{ data }}</pre> -->
    <NCard
      v-if="data?.type === 'file'"
      content-class="flex items-center justify-center"
      class="bg-zinc-100"
    >
      <NImage
        v-if="data.file?.contentType?.startsWith('image')"
        :src="'/files/' + data.target"
      />
      <video
        v-else-if="data.file?.contentType?.startsWith('video')"
        :src="'/files/' + data.target"
        controls
        class="w-[300px]"
      />
      <template #footer>
        <NFlex align="center" justify="center" class="text-center">
          <NTag>{{ data.file?.customMetadata.filename }}</NTag>
          <span>Size: {{ size }}</span>
        </NFlex>
      </template>
    </NCard>
  </NFlex>
</template>
