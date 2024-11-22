<script setup lang="ts">
import type { UploadFileInfo } from "naive-ui"

const {
  data: url,
  execute: upload,
  status,
} = useAsyncData(
  async () => {
    if (!file.value?.file) return
    const formData = new FormData()
    formData.set("type", "file")
    formData.set("input", file.value.file)
    const res = await $fetch<string>("/", { method: "POST", body: formData })
    return res
  },
  {
    immediate: false,
    server: false,
  }
)

const file = ref<UploadFileInfo>()

function onFilesUpdate(fileList: UploadFileInfo[]) {
  file.value = fileList[0]
}

async function onSubmit() {
  if (!file.value?.file) return
  await upload()
}
</script>

<template>
  <NForm :disabled="status === 'pending'">
    <NFormItem>
      <NInputGroup>
        <NUpload
          name="input"
          :show-file-list="false"
          :file-list="[]"
          :default-upload="false"
          trigger-class="w-full"
          @update:file-list="onFilesUpdate"
        >
          <NInput
            :value="file?.name ?? ''"
            placeholder="點我選擇檔案"
            readonly
          />
        </NUpload>
        <NButton
          type="primary"
          :loading="status === 'pending'"
          @click.prevent="onSubmit"
        >
          上傳
        </NButton>
      </NInputGroup>
    </NFormItem>
  </NForm>
  <!-- <pre>{{ file }}</pre> -->
  <CopyBox :value="url" />
</template>
