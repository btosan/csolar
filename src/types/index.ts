export interface BydModel {
  id: string
  name: string
  description: string
  image: string
  slug: string
}

export interface CarouselItem {
  id: string
  type: 'image' | 'video'
  url: string
  alt?: string
}