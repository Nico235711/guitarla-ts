
export type GuitarItem = {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number,
}

// hereda del tipo GuitarItem
export type CartItem = GuitarItem & {
  quantity: number
}