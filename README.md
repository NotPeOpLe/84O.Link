# 84O.Link

普通的短網址服務，也可上傳檔案。

使用 Nuxt3 全端框架，透過 NuxtHub 部屬到 Cloudflard Worker

你可以直接複製這個 repository 自己部屬自己的短網址服務。

> [!WARNING]
> 目前是測試階段，短網址跟檔案可能隨時失效!

## Tech stack

- [Nuxt](https://nuxt.com/) - 全端框架
- [NuxtHub](https://hub.nuxt.com/) - 可把 Nuxt 轉成跟 Cloudflare Worker 整合的無伺服器運算的平台
- [Naive UI](https://www.naiveui.com/) - 功能實用的前端UI
- [Tailwind CSS](https://tailwindcss.com/) - 前端UI輔助用
- [Drizzle ORM](https://orm.drizzle.team/) - 資料庫ORM

## 功能

- 短網址
- 檔案分享 (一個檔案最大25MB)

## 計畫功能

- 使用者
  - 可管理短網址、檔案分享狀態
  - 採用 OAuth 登入方式
- 自訂短網址
- 可設定有效期限
- 訪問權限 (例如有登入的、可預覽、需密碼)
