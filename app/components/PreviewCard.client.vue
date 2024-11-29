<script setup lang="ts">
import type { BlobObject } from "@nuxthub/core"

const props = defineProps<{
  file: BlobObject & { uploadedAt: string }
}>()

const src = computed(
  () =>
    `/files/${props.file.pathname}?filename=${props.file.customMetadata.filename}`
)

function download() {
  const a = document.createElement("a")
  a.href = `/files/${props.file.pathname}`
  a.download = props.file.customMetadata.filename || props.file.pathname
  a.click()
}

const size = computed(() => formatSize(props.file.size))
</script>

<template>
  <NCard content-class="flex items-center justify-center">
    <div class="max-w-2xl">
      <div v-if="file.customMetadata.disablePreview">
        <!-- images -->
        <NImage
          v-if="file.contentType?.startsWith('image')"
          :src="src"
          width="320px"
          object-fit="cover"
        />

        <!-- videos -->
        <video
          v-else-if="file.contentType?.startsWith('video')"
          :src="src"
          class="min-w-[320px] max-w-full"
          controls
        />

        <!-- audios -->
        <audio
          v-else-if="file.contentType?.startsWith('audio')"
          :src="src"
          controls
        />
      </div>

      <!-- unknown type or no-preview -->
      <NFlex v-else align="center" justify="center" vertical>
        <NIcon size="64">
          <Icon name="tabler:file" />
        </NIcon>
        <NText class="text-center"> 無法預覽此檔案 </NText>
      </NFlex>
    </div>
    <template #footer>
      <NFlex align="center" justify="center" class="text-center" vertical>
        <NTag>{{ file.customMetadata.filename }}</NTag>
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
</template>
