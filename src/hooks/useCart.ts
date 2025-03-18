import { useEffect, useMemo, useState } from "react"
import { db } from "../data/db"
import { CartItem, Guitar } from "../types"


const MAX_QUANTITY = 5
const MIN_QUANTITY = 1

const initialCart = () => {
  const cartLS = localStorage.getItem("guitar-cart")
  return cartLS ? JSON.parse(cartLS) : []
}

export const useCart = () => {
  const [data] = useState(db)
  const [cart, setCart] = useState<CartItem[]>(initialCart)

  // persistencia
  useEffect(() => {
    localStorage.setItem("guitar-cart", JSON.stringify(cart))
  }, [cart]);

  const addToCart = (item: Guitar) => {
    // el item existe
    const itemExists = cart.find(guitar => guitar.id === item.id)

    if (itemExists) {
      // itemExists tiene la cantidad no el item
      if (itemExists.quantity >= MAX_QUANTITY) return
      const updatedCart = cart.map(guitar => (
        guitar.id === item.id
          ? { ...guitar, quantity: guitar.quantity + 1 }
          : guitar
      ))
      setCart(updatedCart)
    } else {
      // creo la propiedad para la cantidad
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }

  const removeFromCart = (id: Guitar["id"]) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
  }

  const increaseQuantity = (id: Guitar["id"]) => {
    const updatedCart = cart.map(guitar => (
      guitar.id === id && guitar.quantity < MAX_QUANTITY
        ? { ...guitar, quantity: guitar.quantity + 1 }
        : guitar
    ))
    setCart(updatedCart)
  }

  const decreaseQuantity = (id: Guitar["id"]) => {
    const updatedCart = cart.map(guitar => (
      guitar.id === id && guitar.quantity > MIN_QUANTITY
        ? { ...guitar, quantity: guitar.quantity - 1 }
        : guitar
    ))
    setCart(updatedCart)
  }

  const cleanCart = () => {
    setCart([])
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const total = useMemo(() => cart.reduce((accu, item) => (
    accu + (item.quantity * item.price)
  ), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
    isEmpty,
    total
  }
}
