export type Guitar = {
  id: number
  name: string
  description: string
  image: string
  price: number
}

// herencia de tipos
export type CartItem = Guitar & {
  quantity: number
}