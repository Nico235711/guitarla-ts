import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { CartItem, GuitarItem } from "../types";

const MAX_ITEMS = 5
const MIN_ITEMS = 1
const INITIAL_CART = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart-guitar")
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const useCart = () => {
  const [data] = useState(db)
  const [cart, setCart] = useState(INITIAL_CART)

  useEffect(() => {
    localStorage.setItem("cart-guitar", JSON.stringify(cart))
  }, [cart]);

  const addToCart = (item: GuitarItem) => {
    // también puedo hacerlo con un map
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++ // si lo hago así, necesito el indice
      setCart(updatedCart)
    } else {
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }

  const removeFromCart = (id: GuitarItem["id"]) => {
    const updatedCart = cart.filter(guitar => guitar.id !== id )
    setCart(updatedCart)
  }

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

  const cleanCart = () => setCart([])
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((accu, guitar) => accu + (guitar.price * guitar.quantity), 0), [cart])

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
