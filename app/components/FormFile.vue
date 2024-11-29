<script setup lang="ts">
import { NCheckbox, type UploadFileInfo } from "naive-ui"

const {
  data,
  execute: upload,
  status,
  error,
} = useAsyncData(
  async () => {
    if (!file.value?.file) return
    const formData = new FormData()
    if (disablePreview.value) {
      formData.set("file.disablePreview", "1")
    }
    formData.set("type", "file")
    formData.set("input", file.value.file)
    const res = await $fetch<LinkObjectWithURL>("/", {
      method: "POST",
      body: formData,
    })
    return res
  },
  {
    immediate: false,
    server: false,
  }
)

const file = ref<UploadFileInfo>()
const disablePreview = ref(false)

function onFilesUpdate(fileList: UploadFileInfo[]) {
  error.value = undefined
  file.value = fileList[0]
}

async function onSubmit() {
  if (!file.value?.file) return
  await upload()
  file.value = undefined
  disablePreview.value = false
}
</script>

<template>
  <NForm :disabled="status === 'pending'" class="mb-5">
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
            placeholder="點我選擇檔案 (最大 25MB)"
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
    <NCheckbox v-model:checked="disablePreview"> 不顯示預覽 </NCheckbox>
  </NForm>
  <!-- <pre>{{ file }}</pre> -->

  <NCard content-class="text-center" :bordered="false">
    <NText v-if="error" type="error">
      {{ error?.data?.message || "未知錯誤" }}
    </NText>
    <CopyBox :value="data?.url" :href="data?.url" />
  </NCard>
</template>
