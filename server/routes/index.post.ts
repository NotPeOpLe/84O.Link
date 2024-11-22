export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const form = await readFormData(event)
  const type = form.get("type")
  const input = form.get("input")
  const key = await generateKey()

  if (type === "url" && typeof input === "string") {
    await db.insert(tables.links).values({ key, type, target: input }).run()
    return getRequestURL(event) + key
  }

  if (type === "file" && input instanceof File && input.size) {
    ensureBlob(input, {
      maxSize: "64MB",
      types: [],
    })

    await hubBlob().put(key, input, {
      customMetadata: { filename: input.name },
    })

    await db.insert(tables.links).values({ key, type, target: key }).run()

    return getRequestURL(event) + key
  }
})
