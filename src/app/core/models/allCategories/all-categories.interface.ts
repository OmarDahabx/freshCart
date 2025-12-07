export interface AllCategories {
  results: number
  metadata: Metadata
  data: data[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface data {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
