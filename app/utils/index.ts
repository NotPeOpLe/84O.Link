export const formatSize = (size: number) => {
  const units = ["Bytes", "KB", "MB", "GB", "TB"]
  let index = 0
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }
  return `${size.toFixed(2)} ${units[index]}`
}

export function isBot() {
  const userAgent = useRequestHeader("User-Agent")
  if (!userAgent) return false
  return userAgent.includes("compatible")
}
