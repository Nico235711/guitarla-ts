import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

const initialCart = () => {
  const localStorageCart = localStorage.getItem("cart")
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const useCart = () => {

  // state -> [variable, función modificadora]
  const [data] = useState(db)
  const [cart, setCart] = useState<CartItem[]>(initialCart)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart]);

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  // agrega al carrito
  const addToCart = (item: Guitar) => {
    // reviso si el item ya existe en el arreglo
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) { // compruebo si existe y despues si la cantidad es menor a MAX_ITEMS
      if (cart[itemExists].quantity < MAX_ITEMS) {
        const updatedCart = [...cart] // para no mutar mi state original
        updatedCart[itemExists].quantity++
        setCart(updatedCart)

      }

    } else {
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart([
        ...cart, // tomo un copia para no perder la información previa
        newItem
      ])
    }
  }

  // uso el metodo lookup para extraer el id del item
  const removeFromCart = (id: Guitar["id"]) => {
    // me retorna un array con los elementos cuyo id sea distinto al que recibo por parametro
    const updatedCart = cart.filter(guitar => guitar.id !== id)
    setCart(updatedCart)
  }

  const cleanCart = () => {
    setCart([])
  }

  const increaseQuantity = (id: Guitar["id"]) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  const decreaseQuantity = (id: Guitar["id"]) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  // state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    cleanCart,
    increaseQuantity,
    decreaseQuantity,
    isEmpty,
    cartTotal
  }
}
