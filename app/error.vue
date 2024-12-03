<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <div
    class="h-screen flex items-center justify-center dark:bg-black dark:text-white/80 divide-x space-x-2"
  >
    <h1>{{ error.statusCode }}</h1>
    <div>
      <p>{{ error.statusMessage }}</p>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>
