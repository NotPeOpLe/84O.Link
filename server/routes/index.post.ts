export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const form = await readFormData(event)
  const type = form.get("type")
  const input = form.get("input")
  const key = await generateKey()
  const editKey = await generateEditKey()

  if (type === "url" && typeof input === "string") {
    await db.insert(tables.links).values({ key, type, target: input }).run()
    return getRequestURL(event) + key
  }

  if (type === "file" && input instanceof File && input.size) {
    ensureBlob(input, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      maxSize: "25MB",
      types: [],
    })

    const customMetadata: { [x: string]: string } = {}
    const fileDisablePreview = form.get("file.disablePreview")

    customMetadata.filename = input.name
    if (fileDisablePreview) customMetadata.disablePreview = "1"

    await hubBlob().put(key, input, { customMetadata })

    await db
      .insert(tables.links)
      .values({ key, type, target: key, editKey })
      .run()

    // setResponseHeader(event, "Edit-Key", editKey)
    // appendHeader(event, "Edit-Key", editKey)
    setHeader(event, "Edit-Key", editKey)
    console.log(getResponseHeaders(event))

    return getRequestURL(event) + key
  }
})
