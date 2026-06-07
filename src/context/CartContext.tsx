'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'


export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size: string
}

export interface OrderItem {
  id: string
  items: { name: string; quantity: number; size: string; image: string }[]
  total: number
  timestamp: number
  deliveryMinutes: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity' | 'size'>, quantity: number, size: string) => void
  removeFromCart: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  orders: OrderItem[]
  placeOrder: () => void
  removeOrder: (id: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Load cart and orders on mount
  useEffect(() => {
    setIsMounted(true)
    try {
      const stored = localStorage.getItem('spice_valley_cart')
      if (stored) {
        setCart(JSON.parse(stored))
      }
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err)
    }

    try {
      const storedOrders = localStorage.getItem('spice_valley_orders')
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders))
      }
    } catch (err) {
      console.error('Failed to load orders from localStorage:', err)
    }
  }, [])

  // Save cart when updated
  useEffect(() => {
    if (!isMounted) return
    try {
      localStorage.setItem('spice_valley_cart', JSON.stringify(cart))
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err)
    }
  }, [cart, isMounted])

  // Save orders when updated
  useEffect(() => {
    if (!isMounted) return
    try {
      localStorage.setItem('spice_valley_orders', JSON.stringify(orders))
    } catch (err) {
      console.error('Failed to save orders to localStorage:', err)
    }
  }, [orders, isMounted])

  const addToCart = (item: Omit<CartItem, 'quantity' | 'size'>, quantity: number, size: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(i => i.id === item.id && i.size === size)
      if (existingIdx > -1) {
        const updated = [...prev]
        updated[existingIdx].quantity += quantity
        return updated
      }
      return [...prev, { ...item, quantity, size }]
    })
    
    // Custom luxury themed toast matching restaurant style
    toast.success(`Added ${quantity}x ${item.name} (${size}) to cart!`, {
      style: {
        background: '#131313',
        color: '#ffffff',
        border: '1px solid #c9a054',
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: '1.4rem',
        padding: '12px 18px',
        borderRadius: '8px',
      },
      iconTheme: {
        primary: '#c9a054',
        secondary: '#131313',
      },
    })
    setIsCartOpen(true) // Automatically open drawer upon adding an item
  }

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)))
  }

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size)
      return
    }
    setCart(prev => prev.map(item => 
      item.id === id && item.size === size ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setCart([])
    try {
      localStorage.removeItem('spice_valley_cart')
    } catch (err) {
      console.error('Failed to clear cart localStorage:', err)
    }
  }

  const placeOrder = () => {
    if (cart.length === 0) return
    const tax = cartTotal * 0.08
    const grandTotal = cartTotal + tax
    
    const newOrder: OrderItem = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cart.map(i => ({ name: i.name, quantity: i.quantity, size: i.size, image: i.image })),
      total: grandTotal,
      timestamp: Date.now(),
      deliveryMinutes: 30
    }
    
    setOrders(prev => [newOrder, ...prev])
    clearCart()
  }

  const removeOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id))
  }

  // Derive cart counts and totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      orders,
      placeOrder,
      removeOrder
    }}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
