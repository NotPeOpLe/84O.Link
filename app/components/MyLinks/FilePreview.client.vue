<script setup lang="ts">
const open = ref(false)
defineProps<{
  file: LinkObjectWithURL["file"]
}>()
</script>

<template>
  <NText type="info" tag="a" href="javascript:void" @click="open = true">
    {{ file?.customMetadata.filename }}
  </NText>
  <NModal v-model:show="open">
    <div class="max-w-xl w-full">
      <div class="text-end">
        <NButton size="tiny" quaternary circle @click="open = false">
          <template #icon>
            <Icon name="tabler:x" />
          </template>
        </NButton>
      </div>
      <PreviewCard :file="file" />
    </div>
  </NModal>
</template>
