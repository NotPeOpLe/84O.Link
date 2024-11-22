const NOT_FOUND = createError({ statusCode: 404, message: "Not found" })

export default defineEventHandler(async (event) => {
  const { key }: { key?: string } = getQuery(event)
  console.log("Looking for", key)
  if (!key) throw NOT_FOUND

  const result = useDrizzle()
    .select()
    .from(tables.links)
    .where(eq(tables.links.key, key))
    .get()
  if (!result) throw NOT_FOUND

  return result
})
