import type { BlobObject } from "@nuxthub/core"

type CreatedLink = {
  url: string
  data: Link & { file?: BlobObject }
}

export default defineEventHandler(
  async (event): Promise<CreatedLink | undefined> => {
    const db = useDrizzle()
    const form = await readFormData(event)
    const type = form.get("type")
    const input = form.get("input")
    const key = await generateKey()
    const editKey = await generateEditKey()

    if (type === "url" && typeof input === "string") {
      const dbResult = await db
        .insert(tables.links)
        .values({ key, type, target: input })
        .returning({
          key: tables.links.key,
          type: tables.links.type,
          target: tables.links.target,
          editKey: tables.links.editKey,
        })

      return {
        url: getRequestURL(event) + key,
        data: dbResult[0],
      }
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

      const file = await hubBlob().put(key, input, { customMetadata })

      const dbResult = await db
        .insert(tables.links)
        .values({ key, type, target: key, editKey })
        .returning({
          key: tables.links.key,
          type: tables.links.type,
          target: tables.links.target,
          editKey: tables.links.editKey,
        })

      return {
        url: getRequestURL(event) + key,
        data: {
          ...dbResult[0],
          file,
        },
      }
    }
  }
)
