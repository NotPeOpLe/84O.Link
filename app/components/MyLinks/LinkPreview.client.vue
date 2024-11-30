<script setup lang="ts">
defineProps<{
  link: string
}>()
</script>

<template>
  <NEllipsis style="max-width: 300px">
    <NA tag="a" :href="link" target="_blank"> {{ link }} </NA>
    <template #tooltip>
      <div style="max-width: 300px">
        <NA tag="a" :href="link" target="_blank">
          {{ link }}
        </NA>
      </div>
    </template>
  </NEllipsis>
</template>
