<script setup lang="ts">
useHead({
  title: "84O.Link",
  meta: [
    {
      name: "description",
      content: "普通的短網址服務，也可上傳檔案",
    },
  ],
})
</script>

<template>
  <ClientOnly>
    <NFlex vertical align="center" class="mb-10">
      <NH1 class="mb-0"> 84O.Link </NH1>
      <NText>普通的短網址服務，也可上傳檔案</NText>
      <Links class="justify-self-end" />
    </NFlex>
    <NTabs justify-content="space-evenly" class="h-1/2 w-full">
      <NTabPane name="url" tab="短網址">
        <FormUrl />
      </NTabPane>
      <NTabPane name="file" tab="檔案分享">
        <FormFile />
      </NTabPane>
    </NTabs>
  </ClientOnly>
</template>
