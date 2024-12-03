<script setup lang="tsx">
import {
  useMessage,
  NButton,
  NTime,
  NTag,
  type DataTableColumns,
} from "naive-ui"
import { MyLinksLinkPreview, MyLinksFilePreview } from "#components"
// import MylinksLinkPreview from "#components"

const OFFSET = new Date(2024, 9, 10).getTime()
const message = useMessage()
const router = useRouter()
const linkStorage = useLinkStorage()
const { data, status, refresh } = await useAsyncData(
  "links",
  () => linkStorage.getAllLinks(),
  {
    immediate: false,
    default: () => [] as LinkObjectWithURL[],
  }
)

const columns: DataTableColumns<LinkObjectWithURL> = [
  {
    title: "短網址",
    key: "key",
  },
  {
    title: "類型",
    key: "type",
    render: (row) => {
      const type = () => {
        switch (row.type) {
          case "url":
            return "success"
          case "file":
            return "info"
          default:
            return "default"
        }
      }
      const label = () => {
        switch (row.type) {
          case "url":
            return "網址"
          case "file":
            return "檔案"
          default:
            return "未知"
        }
      }
      return (
        <NTag bordered={false} type={type()}>
          {label()}
        </NTag>
      )
    },
  },
  {
    title: "導向目標",
    key: "target",
    render: (row) => {
      switch (row.type) {
        case "url":
          return <MyLinksLinkPreview link={row.target} />
        case "file":
          return <MyLinksFilePreview file={row.file} />
        default:
          return row.target
      }
    },
  },
  {
    title: "建立時間",
    key: "createdAt",
    render: (row) => (
      <NTime time={parseInt(row.key, 36) + OFFSET} type="relative" />
    ),
  },
  {
    title: "操作",
    key: "actions",
    render: (row) => (
      <NButton type="error" size="small" onClick={() => deleteLink(row)}>
        刪除
      </NButton>
    ),
  },
]

async function deleteLink(payload: LinkObjectWithURL) {
  $fetch(`/${payload.key}`, {
    method: "DELETE",
    headers: {
      "Edit-Key": payload.editKey!,
    },
  })
    .catch(() => {
      message.error(`${payload.key} 刪除失敗`)
    })
    .then(() => {
      linkStorage.deleteLink(payload.key)
      refresh()
      message.success(`${payload.key} 已刪除`)
    })
}

onMounted(async () => {
  setTimeout(() => {
    refresh()
  }, 100)
})
</script>

<template>
  <NFlex vertical>
    <NAlert type="info" title="提醒">
      以下短網址都是由使用者自己生產的，資料會存在瀏覽器中。
    </NAlert>
    <NFlex>
      <NButton
        size="small"
        tag="a"
        @click="() => router.push({ name: 'index' })"
      >
        回首頁
      </NButton>
      <NButton size="small" @client="refresh"> 重新整理 </NButton>
    </NFlex>
    <NDataTable
      :data="data"
      :columns="columns"
      :loading="status === 'pending' || status === 'idle'"
      size="small"
    />
  </NFlex>
</template>
