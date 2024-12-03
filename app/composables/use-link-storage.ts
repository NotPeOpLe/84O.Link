export function useLinkStorage() {
  const db = ref<IDBDatabase | null>(null)
  const request = window.indexedDB.open("links")

  request.onsuccess = function (event) {
    db.value = (event.target as IDBOpenDBRequest).result
  }

  request.onupgradeneeded = function (event) {
    const db = (event.target as IDBOpenDBRequest).result
    const links = db.createObjectStore("links", { keyPath: "key" })
    links.createIndex("editKey", "editKey", { unique: false })
    links.createIndex("type", "type", { unique: false })
    links.createIndex("target", "target", { unique: false })
    links.createIndex("url", "url", { unique: false })
    links.createIndex("file", "file", { unique: false })
  }

  async function insertLink(link: LinkObjectWithURL) {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.value!.transaction("links", "readwrite")
      const store = transaction.objectStore("links")
      const request = store.add(link)

      request.onsuccess = function () {
        resolve()
      }

      request.onerror = function () {
        reject(request.error)
      }
    })
  }

  async function getLink(key: string) {
    return new Promise<LinkObjectWithURL | undefined>((resolve, reject) => {
      const transaction = db.value!.transaction("links", "readonly")
      const store = transaction.objectStore("links")
      const request = store.get(key)

      request.onsuccess = function () {
        resolve(request.result)
      }

      request.onerror = function () {
        reject(request.error)
      }
    })
  }

  async function updateLink(link: LinkObjectWithURL) {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.value!.transaction("links", "readwrite")
      const store = transaction.objectStore("links")
      const request = store.put(link)

      request.onsuccess = function () {
        resolve()
      }

      request.onerror = function () {
        reject(request.error)
      }
    })
  }

  async function deleteLink(key: string) {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.value!.transaction("links", "readwrite")
      const store = transaction.objectStore("links")
      const request = store.delete(key)

      request.onsuccess = function () {
        resolve()
      }

      request.onerror = function () {
        reject(request.error)
      }
    })
  }

  async function getAllLinks() {
    return new Promise<LinkObjectWithURL[]>((resolve, reject) => {
      const transaction = db.value!.transaction("links", "readonly")
      const store = transaction.objectStore("links")
      const request = store.getAll()

      request.onsuccess = function () {
        resolve(request.result)
      }

      request.onerror = function () {
        reject(request.error)
      }
    })
  }

  return {
    insertLink,
    getLink,
    updateLink,
    deleteLink,
    getAllLinks,
  }
}
