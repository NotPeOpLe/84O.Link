export default eventHandler(async (event) => {
  const { key } = getRouterParams(event)

  setHeader(event, "Content-Security-Policy", "default-src 'none';")
  return hubBlob().serve(event, key)
})
