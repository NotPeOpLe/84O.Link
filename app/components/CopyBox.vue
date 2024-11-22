<script setup lang="ts">
const props = defineProps<{
  value?: string
}>()

function copy() {
  if (!props.value) return
  navigator.clipboard.writeText(props.value)
}
</script>

<template>
  <NCard content-class="text-center" :bordered="Boolean(value)">
    <NFlex align="center" justify="center">
      <NText>{{ value }}</NText>
      <NButton v-if="value" text class="text-xl" @click="copy">
        <n-icon>
          <Icon name="tabler:copy" />
        </n-icon>
      </NButton>
    </NFlex>
  </NCard>
</template>
