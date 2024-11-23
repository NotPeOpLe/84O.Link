export default eventHandler(async (event) => {
  const { key } = getRouterParams(event)
  const { filename } = getQuery(event)

  // setHeader(event, "Content-Security-Policy", "default-src 'none';")
  if (filename) {
    setResponseHeader(
      event,
      "Content-Disposition",
      `attachment; filename="${filename}"`
    )
  }

  return hubBlob().serve(event, key)
})
