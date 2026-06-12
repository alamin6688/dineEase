'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { IoCloseOutline, IoTrashOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-hot-toast'


export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal,
    clearCart,
    placeOrder,
    orders,
    removeOrder
  } = useCart()

  const [currentTime, setCurrentTime] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setCurrentTime(Date.now())
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatDeliveryCountdown = (timestamp: number, deliveryMinutes: number) => {
    if (!currentTime) return 'Calculating...'
    const target = timestamp + (deliveryMinutes * 60 * 1000)
    const diff = target - currentTime
    
    if (diff <= 0) {
      return 'Delivered'
    }
    
    const m = Math.floor(diff / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    
    return `${m}m ${s}s remaining`
  }

  // Basic tax calculation
  const tax = cartTotal * 0.08
  const grandTotal = cartTotal + tax

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden font-dmSans">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black-alpha-80 cursor-pointer"
          />

          {/* Drawer Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-[450px] bg-white shadow-[0_0_40px_rgba(0,0%,0%,0.15)] flex flex-col justify-between p-[24px] sm:p-[32px] text-smoky-black-1 z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[hsla(0,0%,0%,0.06)] pb-[16px]">
              <div className="flex items-center gap-[10px]">
                <div className="w-[8px] h-[8px] bg-gold-crayola rotate-45 rounded-sm" />
                <h2 className="font-forum text-[2.2rem] font-bold uppercase tracking-ls-1">
                  Your Order
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="text-smoky-black-1 p-[8px] hover:bg-gold-crayola/15 border border-[hsla(0,0%,0%,0.06)] rounded-full transition-all"
                aria-label="Close cart"
              >
                <IoCloseOutline size={20} />
              </button>
            </div>

            {/* Scrollable Cart Items List */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto py-[20px] pr-[4px] flex flex-col gap-[16px]"
            >
              
              {/* Active Deliveries inside Cart Drawer */}
              {isMounted && orders.length > 0 && (
                <div className="mb-[20px] bg-[#FAF9F6] border border-[hsla(38,61%,73%,0.25)] rounded-xl p-[16px] shadow-sm">
                  <div className="flex items-center gap-[8px] mb-[12px] border-b border-[hsla(0,0%,0%,0.06)] pb-[8px]">
                    <div className="w-[8px] h-[8px] bg-gold-crayola rotate-45 rounded-sm" />
                    <h3 className="font-forum text-[1.5rem] uppercase tracking-ls-2 font-bold text-smoky-black-1">
                      Active Deliveries
                    </h3>
                  </div>
                  
                  <div className="flex flex-col gap-[12px]">
                    {orders.map(order => (
                      <div 
                        key={order.id}
                        className="bg-white border border-[hsla(0,0%,0%,0.04)] rounded-lg p-[12px] flex justify-between items-start gap-[12px]"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-[6px] mb-[4px]">
                            <span className="text-[1rem] font-bold tracking-wider text-gold-crayola uppercase bg-smoky-black-1 px-[6px] py-[2px] rounded">
                              {order.id}
                            </span>
                            <span className="text-[1.1rem] text-davys-grey font-semibold">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[1.2rem] font-bold text-smoky-black-1 leading-snug">
                            {order.items.map(i => `${i.quantity}x ${i.name} (${i.size})`).join(', ')}
                          </p>
                          <span className="inline-block mt-[4px] text-gold-crayola font-bold text-[1.1rem] uppercase tracking-wider animate-pulse">
                            {formatDeliveryCountdown(order.timestamp, order.deliveryMinutes)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeOrder(order.id)}
                          className="text-quick-silver hover:text-red-500 p-1"
                          title="Clear Delivery"
                        >
                          <IoCloseOutline size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cart.length === 0 && orders.length === 0 ? (
                <div className="text-center py-[60px] flex flex-col gap-3">
                  <p className="text-[1.8rem] font-bold text-davys-grey font-forum uppercase">
                    Your cart is empty
                  </p>
                  <p className="text-body-2 text-quick-silver max-w-[280px] mx-auto">
                    Add delicious culinary dishes from our menu to start your order.
                  </p>
                </div>
              ) : (
                cart.map(item => (
                  <div 
                    key={`${item.id}-${item.size}`}
                    className="flex gap-[12px] bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.04)] rounded-xl p-[12px] relative group hover:shadow-sm transition-shadow"
                  >
                    {/* Item Thumbnail */}
                    <div className="relative w-[70px] h-[70px] rounded-lg overflow-hidden shrink-0 bg-[#EAE8E3]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="70px"
                        className="object-cover"
                      />
                    </div>

                    {/* Details column */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-forum text-[1.6rem] font-bold uppercase tracking-ls-1 leading-snug max-w-[190px]">
                            {item.name}
                          </h3>
                          <span className="font-mono font-bold text-[1.4rem]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <span className="text-[1.1rem] font-bold text-gold-crayola uppercase bg-smoky-black-1 px-[6px] py-[2px] rounded inline-block mt-[4px]">
                          Options: {item.size}
                        </span>
                      </div>

                      {/* Quantity Controls + Trash Button row */}
                      <div className="flex justify-between items-center mt-[10px]">
                        <div className="flex items-center border border-[hsla(0,0%,0%,0.1)] rounded-md overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-[6px] hover:bg-gold-crayola/10 text-smoky-black-1 transition-all"
                            aria-label="Decrease quantity"
                          >
                            <IoRemoveOutline size={14} />
                          </button>
                          <span className="px-[12px] font-bold text-[1.3rem] font-mono select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-[6px] hover:bg-gold-crayola/10 text-smoky-black-1 transition-all"
                            aria-label="Increase quantity"
                          >
                            <IoAddOutline size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-quick-silver hover:text-red-600 transition-colors p-[6px]"
                          aria-label="Remove item"
                        >
                          <IoTrashOutline size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer calculations & checkout */}
            {cart.length > 0 && (
              <div className="border-t border-[hsla(0,0%,0%,0.06)] pt-[16px] flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px] text-[1.4rem] font-bold">
                  <div className="flex justify-between text-davys-grey border-b border-[hsla(0,0%,0%,0.03)] pb-[6px]">
                    <span>Subtotal</span>
                    <span className="font-mono">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-davys-grey border-b border-[hsla(0,0%,0%,0.03)] pb-[6px]">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-mono">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[1.6rem] text-smoky-black-1 pt-[4px]">
                    <span>Order Total</span>
                    <span className="font-mono text-gold-crayola">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <button
                    type="button"
                    onClick={() => {
                      toast.success('Thank you for ordering! Checkout successful.', {
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
                      placeOrder()
                      setIsCartOpen(false)
                    }}
                    className="bg-smoky-black-1 text-white hover:text-gold-crayola font-bold uppercase tracking-ls-3 text-label-2 py-[16px] w-full text-center transition-all shadow-md cursor-pointer rounded-lg"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[1.2rem] text-quick-silver hover:text-red-500 font-bold uppercase tracking-ls-2 transition-all self-center py-2"
                  >
                    Clear All Items
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
