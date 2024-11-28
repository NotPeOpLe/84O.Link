export function useLinkStorage() {
  return useLocalStorage("link-storage", () => ({ urls: [], files: [] }))
}
