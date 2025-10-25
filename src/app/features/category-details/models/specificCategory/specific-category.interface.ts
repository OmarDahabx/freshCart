export interface Root {
  data: SpecificCategory
}

export interface SpecificCategory {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}