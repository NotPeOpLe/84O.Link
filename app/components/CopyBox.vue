<script setup lang="ts">
const props = defineProps<{
  value?: string
  href?: string
}>()

function copy() {
  if (!props.value) return
  navigator.clipboard.writeText(props.value)
}
</script>

<template>
  <NFlex align="center" justify="center">
    <NA v-if="href" :href="href" target="_blank">{{ value }}</NA>
    <NText v-else>{{ value }}</NText>
    <NButton v-if="value" text class="text-xl" @click="copy">
      <n-icon>
        <Icon name="tabler:copy" />
      </n-icon>
    </NButton>
  </NFlex>
</template>
