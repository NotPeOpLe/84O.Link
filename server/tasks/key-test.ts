export default defineTask({
  async run() {
    const db = useDrizzle()
    async function work() {
      const key = await generateKey()
      const type = "url"
      const input = "https://example.com"
      console.log("Inserting", key)
      await db.insert(tables.links).values({ key, type, target: input }).run()
    }

    // Run the task 10000 times
    for (let i = 0; i < 100000; i++) {
      await work()
    }
    return { result: "done" }
  },
})
