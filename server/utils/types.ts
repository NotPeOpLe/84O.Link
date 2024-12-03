import type { BlobObject } from "@nuxthub/core"

export type LinkObject = Link & { file?: BlobObject }
export type LinkObjectWithURL = LinkObject & { url: string }
export type LinkObjectWithoutEditKey = Omit<Link, "editKey"> & {
  file?: BlobObject
}
export type LinkType = "url" | "file"
