export type GuitarItem = {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number,
}

// herencia de tipos
export type CartItem = GuitarItem & {
  quantity: number
}