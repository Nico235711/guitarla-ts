import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { CartItem, GuitarItem } from "../types";

const maxItems = 5
const minItems = 1
const initialCart = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart-guitar")
  return storedCart ? JSON.parse(storedCart) : []
}
export const useCart = () => {
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem("cart-guitar", JSON.stringify(cart))
  }, [cart]);

  const addToCart = (item: GuitarItem) => {
    const itemExistsIndex = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExistsIndex >= 0) {
      if (cart[itemExistsIndex].quantity >= maxItems) return
      const updatedCart = [...cart] // para no mutar el state
      updatedCart[itemExistsIndex].quantity++
      setCart(updatedCart)
    } else {
      const newItem: CartItem = {...item, quantity: 1}
      setCart([...cart, newItem])
    }
  }

  const removeFromCart = (id: GuitarItem["id"]) => {
    const updatedCart = cart.filter(guitar => guitar.id !== id)
    setCart(updatedCart)
  }

  const increaseQuantity = (id: GuitarItem["id"]) => {
    const updatedCart = cart.map(guitar => (
      guitar.id === id && guitar.quantity < maxItems
        ? { ...guitar, quantity: guitar.quantity + 1 }
        : guitar
    ))
    setCart(updatedCart)
  }

  const decreaseQuantity = (id: GuitarItem["id"]) => {
    const updatedCart = cart.map(guitar => (
      guitar.id === id && guitar.quantity > minItems
        ? { ...guitar, quantity: guitar.quantity - 1 }
        : guitar
    ))
    setCart(updatedCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((accu, guitar) => accu + (guitar.price * guitar.quantity), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }
}
