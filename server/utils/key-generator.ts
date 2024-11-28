import crypto from "crypto"

const OFFSET = new Date(2024, 9, 10).getTime()

export async function generateKey() {
  return (Date.now() - OFFSET).toString(36)
}

export async function generateEditKey() {
  return crypto.randomBytes(32).toString("hex")
}
