import type { BlobObject } from "@nuxthub/core"

export type LinkObject = Omit<Link, "editKey"> & { file?: BlobObject }
export type LinkType = "url" | "file"
