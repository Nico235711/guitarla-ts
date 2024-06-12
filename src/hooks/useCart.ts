import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { CardItem, Guitar } from "../types";

export const useCart = () => {

  const initialCart = (): CardItem[] => { 
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart]);

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  function addToCart(item: Guitar) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) { // si existe
      if (cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++ // no muto el state original
      setCart(updatedCart)

    } else {
      // creo la propiedad de cantidad
      const newItem: CardItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }

  function removeFromCart(id: Guitar["id"]) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) { // si es el mismo y no supera la cantida máxima
        return { ...item, quantity: ++item.quantity }
      }

      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) { // si es el mismo y no supera la cantida máxima
        return { ...item, quantity: --item.quantity }
      }

      return item
    })
    setCart(updatedCart)
  }

  function cleanCart() {
    setCart([])
  }

  // state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
    isEmpty,
    cartTotal
  }
}