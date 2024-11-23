<script setup lang="ts">
import { NImage, NTag } from "naive-ui"

const route = useRoute()
const { data } = await useFetch("/api", {
  query: { key: route.params.key },
})

if (!data.value) {
  throw createError({ statusCode: 404 })
}

if (data.value && data.value.type === "url") {
  await navigateTo(data.value?.target, { external: true })
}

const src = computed(
  () =>
    `/files/${data.value!.target}?filename=${data.value!.file!.customMetadata.filename}`
)

function isBot() {
  const userAgent = useRequestHeader("User-Agent")
  if (!userAgent) return false
  return userAgent.includes("compatible")
}

if (import.meta.server && isBot()) {
  await navigateTo("/files/" + data.value.target, { external: true })
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

function download() {
  if (!data.value?.file) return
  const a = document.createElement("a")
  a.href = `/files/${data.value.target}`
  a.download = data.value.file.customMetadata.filename || data.value.target
  a.click()
}
</script>

<template>
  <ClientOnly>
    <NCard
      v-if="data?.type === 'file'"
      content-class="flex items-center justify-center"
    >
      <div class="max-w-2xl">
        <div v-if="!data.file?.customMetadata.disablePreview">
          <!-- images -->
          <NImage
            v-if="data.file?.contentType?.startsWith('image')"
            :src="src"
            width="320px"
            object-fit="cover"
          />

          <!-- videos -->
          <video
            v-else-if="data.file?.contentType?.startsWith('video')"
            :src="src"
            class="min-w-[320px] max-w-full"
            controls
          />

          <!-- audios -->
          <audio
            v-else-if="data.file?.contentType?.startsWith('audio')"
            :src="src"
            controls
          />
        </div>

        <!-- unknown type or no-preview -->
        <NFlex v-else align="center" justify="center" vertical>
          <NIcon size="64">
            <Icon name="tabler:file" />
          </NIcon>
          <NText class="text-center">無法預覽此檔案</NText>
        </NFlex>
      </div>
      <template #footer>
        <NFlex align="center" justify="center" class="text-center" vertical>
          <NTag>{{ data.file?.customMetadata.filename }}</NTag>
          <span>Size: {{ size }}</span>
          <NFlex align="center" justify="center">
            <NButton type="primary" size="small" @click="download">
              <template #icon>
                <Icon name="tabler:arrow-bar-to-down" />
              </template>
              下載
            </NButton>
          </NFlex>
        </NFlex>
      </template>
    </NCard>
  </ClientOnly>
</template>
