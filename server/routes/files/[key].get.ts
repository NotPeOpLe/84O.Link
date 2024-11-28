export default eventHandler(async (event) => {
  const { key } = getRouterParams(event)
  const { filename } = getQuery(event)

  // setHeader(event, "Content-Security-Policy", "default-src 'none';")
  if (filename) {
    setResponseHeader(
      event,
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(filename as string)}"`
    )
  }

  return hubBlob().serve(event, key)
})
