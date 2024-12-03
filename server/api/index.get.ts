const NOT_FOUND = createError({
  statusCode: 404,
  message: "Not found",
})

export default defineEventHandler(
  async (event): Promise<LinkObjectWithoutEditKey> => {
    const { key }: { key?: string } = getQuery(event)
    if (!key) throw NOT_FOUND

    const result = await useDrizzle()
      .select({
        key: tables.links.key,
        type: tables.links.type,
        target: tables.links.target,
      })
      .from(tables.links)
      .where(eq(tables.links.key, key))
      .get()
    if (!result) throw NOT_FOUND

    if (result.type === "file") {
      const blob = await hubBlob().head(result.target)
      return Object.assign(result, { file: blob })
    }

    return result
  }
)
