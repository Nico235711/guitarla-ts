export type GuitarItem = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = GuitarItem & {
  quantity: number
}