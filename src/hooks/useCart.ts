import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { CartItem, GuitarItem } from "../types";

const MAX_ITEMS = 5
const MIN_ITEMS = 1
const INITIAL_CART = (): CartItem[] => {
  const localstorageCart = localStorage.getItem("cart-guitar")
  return localstorageCart ? JSON.parse(localstorageCart) : []
}

export const useCart = () => {
  const [data] = useState(db)
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART)

  useEffect(() => {
    localStorage.setItem("cart-guitar", JSON.stringify(cart))
  }, [cart]);

  const addToCart = (item: GuitarItem) => {
    const itemExists = cart.find(guitar => guitar.id === item.id)
    if (itemExists) {
      const updatedCart = cart.map(guitar => (
        guitar.id === item.id && guitar.quantity < MAX_ITEMS
          ? { ...guitar, quantity: guitar.quantity + 1 }
          : guitar
      ))
      setCart(updatedCart)
    } else {
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }

  const removeFromCart = (id: GuitarItem["id"]) => {
    const updatedCart = cart.filter(guitar => guitar.id !== id)
    setCart(updatedCart)
  }

  const increaseQuantity = (id: GuitarItem["id"]) => {
    const updatedCart = cart.map(guitar => guitar.id === id && guitar.quantity < MAX_ITEMS ? {...guitar, quantity: guitar.quantity + 1 } : guitar)
    setCart(updatedCart)
  }

  const decreaseQuantity = (id: GuitarItem["id"]) => {
    const updatedCart = cart.map(guitar => guitar.id === id && guitar.quantity > MIN_ITEMS ? {...guitar, quantity: guitar.quantity - 1 } : guitar)
    setCart(updatedCart)
  }

  const cleanCart = () => setCart([])
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((accu, guitar) => accu + (guitar.quantity * guitar.price), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
    isEmpty,
    cartTotal,
  }
}
