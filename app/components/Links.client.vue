<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <NFlex>
    <NButton
      size="small"
      tag="a"
      href="https://github.com/NotPeOpLe/84O.Link"
      target="_blank"
      ghost
    >
      <template #icon>
        <Icon name="tabler:brand-github" />
      </template>
      GitHub
    </NButton>
    <NButton size="small" @click="() => router.push({ name: 'links' })">
      我的短網址
    </NButton>
  </NFlex>
</template>
