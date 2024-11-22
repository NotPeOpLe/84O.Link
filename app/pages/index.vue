<script setup lang="ts"></script>

<template>
  <NFlex align="center" justify="center" class="h-screen" vertical>
    <NFlex vertical align="center" class="mb-5">
      <NH1 class="mb-0"> 84O.Link </NH1>
      <NText>普通的短網址服務，也可上傳檔案</NText>
    </NFlex>
    <div class="h-1/2 w-full">
      <NTabs justify-content="space-evenly">
        <NTabPane name="url" tab="短網址">
          <FormUrl />
        </NTabPane>
        <NTabPane name="file" tab="檔案分享">
          <FormFile />
        </NTabPane>
      </NTabs>
    </div>
  </NFlex>
</template>
