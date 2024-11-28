<script setup lang="ts">
import { type FormRules, type FormInst, NFormItem } from "naive-ui"

const { data, status, error, execute } = useAsyncData(
  () => {
    const formData = new FormData()
    formData.append("type", model.value.type)
    formData.append("input", model.value.input)
    model.value.input = ""
    return $fetch<string>("/", { method: "POST", body: formData })
  },
  {
    immediate: false,
    server: false,
  }
)

const formRef = ref<FormInst>()

const model = ref({
  type: "url",
  input: "",
})

const rules: FormRules = {
  input: [
    { type: "url", required: true, message: "請輸入網址" },
    {
      validator: (rule, value: string) => {
        if (value.length === 0) return true
        return value.startsWith("https://") || value.startsWith("http://")
      },
      message: "請不要用些奇怪的協定",
    },
    {
      validator: (rule, value: string) => {
        if (value.length === 0) return true
        return value.startsWith("https://")
      },
      message: "只接受 https 網址",
    },
    {
      validator: (rule, value: string) => {
        if (value.length === 0) return true
        return new URL(value).host !== location.host
      },
      message: "不要貼上本站的網址啦",
    },
  ],
}

async function onSubmit() {
  await formRef.value?.validate()
  await execute()
}
</script>

<template>
  <NForm
    ref="formRef"
    :model="model"
    :rules="rules"
    class="w-full"
    :disabled="status === 'pending'"
  >
    <NFormItem path="input">
      <NInputGroup>
        <NInput
          v-model:value="model.input"
          placeholder="請貼上那又臭又長的網址"
        />
        <NButton
          type="primary"
          :loading="status === 'pending'"
          @click.prevent="onSubmit"
        >
          <template #icon> 🪄 </template>
          施點魔法
        </NButton>
      </NInputGroup>
    </NFormItem>
  </NForm>
  <NCard content-class="text-center" :bordered="false">
    <NText v-if="error" type="error">
      {{ error?.data?.message || "未知錯誤" }}
    </NText>
    <CopyBox :value="data?.url" :href="data?.url" />
  </NCard>
</template>
