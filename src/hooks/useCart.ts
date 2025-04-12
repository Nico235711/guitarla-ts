import { useState, useMemo, useEffect } from "react"
import { db } from "../data/db"
import { CartItem, GuitarItem } from "../types"

const MAX_ITEMS = 5
const MIN_ITEMS = 1
const INITIAL_CART = () => {
  const cartLS = localStorage.getItem("cart-guitar")
  return cartLS ? JSON.parse(cartLS) : []
}

export const useCart = () => {
  const [data] = useState(db)
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART)

  useEffect(() => {
    localStorage.setItem("cart-guitar", JSON.stringify(cart))
  }, [cart]);

  const addToCart = (item: GuitarItem) => {
    // verificar si ya existe
    const itemExists = cart.find(guitar => guitar.id === item.id)
    if (itemExists) {
      if (itemExists.quantity >= MAX_ITEMS) return
      const updateCart = cart.map(guitar => {
        if (guitar.id === item.id) {
          return {
            ...guitar,
            quantity: guitar.quantity + 1,
          }
        }
        return guitar
      })
      setCart(updateCart)
    } else {
      const newItem: CartItem = { ...item, quantity: 1}
      setCart([...cart, newItem])
    }
  }

  const removeFromCart = (id: GuitarItem["id"]) => {
    const updatedCart = cart.filter(guitar => guitar.id !== id)
    setCart(updatedCart)
  }

  const cleanCart = () => setCart([])

  const increaseQuantity = (id: GuitarItem["id"]) => {
    const updatedCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1
        }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  const decreaseQuantity = (id: GuitarItem["id"]) => {
    const updatedCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1
        }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const total = useMemo(() => cart.reduce((acc, guitar) => acc + (guitar.price 
  * guitar.quantity), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    cleanCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    isEmpty,
    total,
  }
}
