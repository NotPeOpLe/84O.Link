export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, "key")
  const editKey = getRequestHeader(event, "Edit-Key")

  if (!key || !editKey) {
    throw createError({
      status: 400,
      message: "Key and Edit-Key are required",
    })
  }

  const db = useDrizzle()

  const result = await db
    .delete(tables.links)
    .where(and(eq(tables.links.key, key), eq(tables.links.editKey, editKey)))
    .run()

  if (result.meta.changes === 0) {
    throw createError({
      status: 400,
      message: "failed to delete",
    })
  }

  return sendNoContent(event)
})
