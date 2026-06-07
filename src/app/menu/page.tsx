'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import BodyLoader from '@/components/BodyLoader'
import CartDrawer from '@/components/CartDrawer'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  IoSearchOutline, 
  IoAddOutline, 
  IoRemoveOutline, 
  IoHeartOutline, 
  IoCartOutline, 
  IoArrowBackOutline, 
  IoStar,
  IoCloseOutline 
} from 'react-icons/io5'
import { useCart } from '@/context/CartContext'

// Menu Item Structure
interface MenuItem {
  id: string
  name: string
  category: 'pizza' | 'pasta' | 'starters' | 'drinks' | 'mains' | 'vegan-starters' | 'specials' | 'kebabs' | 'seafood'
  price: number
  image: string
  rating: number
  reviewsCount: number
  badge: string | null
  likesCount?: number
  desc: string
  deliveryTime: string
}

// Complete Menu Database matching screenshots
const menuDatabase: MenuItem[] = [
  // Popular Dishes (Top Row)
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    category: 'pizza',
    price: 34.00,
    image: '/assets/images/service-2.jpg',
    rating: 4.8,
    reviewsCount: 340,
    badge: 'BEST SELLER',
    desc: 'Classic Neapolitan pizza topped with fresh tomato sauce, creamy mozzarella di bufala, organic olive oil, and aromatic basil leaves.',
    deliveryTime: '20 - 30 mins'
  },
  {
    id: 'truffle-pasta',
    name: 'Truffle Mushroom Pasta',
    category: 'pasta',
    price: 12.00,
    image: '/assets/images/service-1.jpg',
    rating: 4.8,
    reviewsCount: 520,
    badge: 'BEST SELLER',
    desc: 'Artisanal fettuccine pasta tossed in a velvety cream sauce infused with white truffle oil, sautéed wild porcini mushrooms, and freshly grated aged parmesan.',
    deliveryTime: '25 - 35 mins'
  },
  {
    id: 'mango-smoothie',
    name: 'Mango Smoothie',
    category: 'drinks',
    price: 12.00,
    image: '/assets/images/service-3.jpg',
    rating: 4.8,
    reviewsCount: 180,
    badge: 'HOT',
    desc: 'Refreshing tropical blend of ripe alphonso mangoes, creamy coconut milk, wild honey, and crushed ice, topped with a fresh mango slice.',
    deliveryTime: '15 - 25 mins'
  },
  {
    id: 'strawberry-pancakes',
    name: 'Strawberry Pancake Stack',
    category: 'drinks',
    price: 8.00,
    image: '/assets/images/hero-slider-3.jpg',
    rating: 4.8,
    reviewsCount: 290,
    badge: 'HOT',
    desc: 'Fluffy buttermilk pancakes stacked high, drizzled with premium organic maple syrup, fresh strawberries, and whipped vanilla mascarpone.',
    deliveryTime: '20 - 30 mins'
  },

  // Starters
  {
    id: 'popadum',
    name: 'Popadum',
    category: 'starters',
    price: 1.20,
    image: '/assets/images/hero-slider-1.jpg',
    rating: 4.7,
    reviewsCount: 95,
    badge: null,
    likesCount: 10,
    desc: 'Thin, crisp, disc-shaped roasted snack originating from the Indian subcontinent. Served with chutney dips.',
    deliveryTime: '10 - 15 mins'
  },
  {
    id: 'chutneys-tray',
    name: 'Tray of Chutneys',
    category: 'starters',
    price: 2.80,
    image: '/assets/images/event-1.jpg',
    rating: 4.8,
    reviewsCount: 140,
    badge: null,
    likesCount: 11,
    desc: 'A trio of house dips: sweet mango, cooling mint-yogurt, and red onion. Add lime pickle or chilli sauce as optional.',
    deliveryTime: '10 - 15 mins'
  },
  {
    id: 'samosa',
    name: 'Samosa (Mild)',
    category: 'starters',
    price: 5.70,
    image: '/assets/images/event-2.jpg',
    rating: 4.9,
    reviewsCount: 880,
    badge: '#1 POPULAR',
    likesCount: 52,
    desc: 'Crispy pastry parcels filled with a savory mix of spiced potatoes, green peas, and fresh herbs.',
    deliveryTime: '15 - 20 mins'
  },
  {
    id: 'onion-bhaji',
    name: 'Onion Bhaji (Mild)',
    category: 'starters',
    price: 5.70,
    image: '/assets/images/event-3.jpg',
    rating: 4.8,
    reviewsCount: 610,
    badge: '#2 MOST LIKED',
    likesCount: 41,
    desc: 'Crispy, sliced onion fritters bound in seasoned chickpea gram flour batter and deep-fried to perfection.',
    deliveryTime: '15 - 20 mins'
  },
  {
    id: 'paneer-tikka-starter',
    name: 'Paneer Tikka (Mild)',
    category: 'starters',
    price: 8.50,
    image: '/assets/images/service-1.jpg',
    rating: 4.8,
    reviewsCount: 220,
    badge: 'NEW',
    likesCount: 28,
    desc: 'Spiced cottage cheese cubes marinated in yogurt and tandoori spices, charcoal grilled with bell peppers and onions.',
    deliveryTime: '15 - 20 mins'
  },
  {
    id: 'chicken-tikka-starter',
    name: 'Chicken Tikka Starter',
    category: 'starters',
    price: 9.00,
    image: '/assets/images/service-2.jpg',
    rating: 4.9,
    reviewsCount: 390,
    badge: 'NEW',
    likesCount: 45,
    desc: 'Tender chicken breast pieces marinated in spiced yogurt and grilled to perfection in the clay oven.',
    deliveryTime: '15 - 20 mins'
  },
  {
    id: 'sheekh-kebab-starter',
    name: 'Sheekh Kebab Starter',
    category: 'starters',
    price: 9.50,
    image: '/assets/images/service-3.jpg',
    rating: 4.8,
    reviewsCount: 170,
    badge: 'NEW',
    likesCount: 33,
    desc: 'Minced lamb spiced with garlic, ginger, and fresh herbs, skewered and cooked over hot charcoals.',
    deliveryTime: '15 - 20 mins'
  },
  {
    id: 'tandoori-prawn-starter',
    name: 'Tandoori Prawn Starter',
    category: 'starters',
    price: 11.00,
    image: '/assets/images/about-banner.jpg',
    rating: 5.0,
    reviewsCount: 150,
    badge: 'SIGNATURE',
    likesCount: 38,
    desc: 'Jumbo prawns marinated in spiced yogurt and grilled in the tandoor clay oven. Served with lemon wedges.',
    deliveryTime: '18 - 25 mins'
  },

  // Vegan Starters
  {
    id: 'aloo-tikki',
    name: 'Aloo Tikki (Mild)',
    category: 'vegan-starters',
    price: 6.50,
    image: '/assets/images/hero-slider-2.jpg',
    rating: 4.7,
    reviewsCount: 120,
    badge: 'VEGAN',
    likesCount: 22,
    desc: 'Crispy spiced potato patties shallow-fried and served with tangy tamarind and cooling green mint chutneys.',
    deliveryTime: '12 - 18 mins'
  },
  {
    id: 'veg-pakora',
    name: 'Vegetable Pakora',
    category: 'vegan-starters',
    price: 5.90,
    image: '/assets/images/about-abs-image.jpg',
    rating: 4.8,
    reviewsCount: 155,
    badge: 'VEGAN',
    likesCount: 19,
    desc: 'Deep-fried mixed seasonal vegetable fritters coated in a delicately spiced chickpea gram flour batter.',
    deliveryTime: '12 - 18 mins'
  },

  // Chef's Specials
  {
    id: 'tandoori-mix',
    name: 'Spice Valley Tandoori Mix',
    category: 'specials',
    price: 19.50,
    image: '/assets/images/special-dish-banner.jpg',
    rating: 5.0,
    reviewsCount: 420,
    badge: 'CHEF RECOMMEND',
    desc: 'A grand platter featuring prime cuts of chicken tikka, lamb seekh kebab, and marinated tandoori king prawns grilled over clay-oven charcoals.',
    deliveryTime: '20 - 30 mins'
  },
  {
    id: 'goan-fish',
    name: 'Goan Fish Curry',
    category: 'specials',
    price: 17.50,
    image: '/assets/images/about-banner.jpg',
    rating: 4.9,
    reviewsCount: 310,
    badge: 'SIGNATURE',
    desc: 'Fresh fillets of sea bass simmered in a mildly spiced, coconut milk-based Goan curry infused with fresh coriander and red chillies.',
    deliveryTime: '22 - 32 mins'
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken (Murgh Makhani)',
    category: 'specials',
    price: 14.50,
    image: '/assets/images/service-1.jpg',
    rating: 4.9,
    reviewsCount: 940,
    badge: 'BEST SELLER',
    desc: 'Tender tandoori chicken chunks simmered in a smooth, buttery, creamy tomato sauce seasoned with fenugreek leaves.',
    deliveryTime: '20 - 30 mins'
  },

  // Traditional Mains
  {
    id: 'tikka-masala',
    name: 'Tikka Masala (Mild)',
    category: 'mains',
    price: 12.00,
    image: '/assets/images/about-banner.jpg',
    rating: 5.0,
    reviewsCount: 1112,
    badge: 'SIGNATURE',
    desc: 'Tandoori-grilled chicken chunks slow-cooked in a velvety, sweet-savory tomato-cream gravy finished with fenugreek.',
    deliveryTime: '25 - 35 mins'
  },
  {
    id: 'korma',
    name: 'Korma (Mild)',
    category: 'mains',
    price: 12.00,
    image: '/assets/images/about-abs-image.jpg',
    rating: 4.8,
    reviewsCount: 450,
    badge: 'SIGNATURE',
    desc: 'A rich and mildly sweet coconut and almond-based curry cooked with tender chicken and aromatic spices.',
    deliveryTime: '25 - 35 mins'
  },
  {
    id: 'jalfrezi',
    name: 'Jalfrezi (Medium)',
    category: 'mains',
    price: 12.00,
    image: '/assets/images/special-dish-banner.jpg',
    rating: 4.9,
    reviewsCount: 670,
    badge: 'HOT',
    desc: 'A moderately spicy curry cooked with sliced capsicums, onions, tomatoes, and fresh green chillies.',
    deliveryTime: '25 - 35 mins'
  }
]

export default function MenuCatalogPage() {
  const { addToCart } = useCart()

  // State hooks
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [showAllStarters, setShowAllStarters] = useState(false)
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [topCategory, setTopCategory] = useState<'all' | 'pizza' | 'pasta' | 'starters' | 'drinks'>('all')
  const [bottomCategory, setBottomCategory] = useState<'starters' | 'vegan' | 'specials' | 'mains'>('starters')

  // Reset showAllStarters when tab changes
  useEffect(() => {
    setShowAllStarters(false)
  }, [bottomCategory])

  // Details screen local state
  const [detailQty, setDetailQty] = useState(1)
  const [detailSize, setDetailSize] = useState<'S' | 'M' | 'L' | 'XL'>('L')

  // Find active selected detailed item
  const selectedItem = menuDatabase.find(i => i.id === selectedItemId)

  // Reset details inputs when page changes
  useEffect(() => {
    setDetailQty(1)
    setDetailSize('L')
  }, [selectedItemId])

  // Filter items in the top popular section
  const filteredPopular = menuDatabase.filter(item => {
    // Show only the 4 popular items from top (pizza, pasta, mango-smoothie, pancakes)
    const isPopularItem = ['margherita-pizza', 'truffle-pasta', 'mango-smoothie', 'strawberry-pancakes'].includes(item.id)
    if (!isPopularItem) return false
    if (topCategory === 'all') return true
    return item.category === topCategory
  })

  // Filter items in the bottom section
  const filteredGrid = menuDatabase.filter(item => {
    // Exclude top popular items from bottom list for structural cleanliness, unless search is active
    const isPopularItem = ['margherita-pizza', 'truffle-pasta', 'mango-smoothie', 'strawberry-pancakes'].includes(item.id)
    
    // If search active: filter all items in database
    if (searchQuery.trim() !== '') {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    }

    // Otherwise filter by category tab
    if (isPopularItem) return false
    if (bottomCategory === 'starters') return item.category === 'starters'
    if (bottomCategory === 'vegan') return item.category === 'vegan-starters'
    if (bottomCategory === 'specials') return item.category === 'specials'
    if (bottomCategory === 'mains') return item.category === 'mains'
    return false
  })

  // Sliced items list when showing starters with a "Show More" limit
  const visibleGridItems = (bottomCategory === 'starters' && searchQuery.trim() === '' && !showAllStarters)
    ? filteredGrid.slice(0, 4)
    : filteredGrid

  // Handlers
  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation() // Prevent entering detailed page
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image }, 1, 'L')
  }

  const handleDetailsAdd = () => {
    if (!selectedItem) return
    addToCart(
      { id: selectedItem.id, name: selectedItem.name, price: selectedItem.price, image: selectedItem.image },
      detailQty,
      detailSize
    )
  }

  return (
    <>
      <BodyLoader />
      <Header />

      <main className="bg-[#FAF9F6] pt-[140px] pb-[100px] lg:pt-[180px] lg:pb-[140px] min-h-screen text-smoky-black-1 font-dmSans">
        <div className="max-w-[1200px] mx-auto px-[16px] lg:px-[20px]">
          

          {/* ───────────────── MENU CATALOG LIST VIEW ───────────────── */}
          <div>
            {/* 1. Page Hero Header */}
            <div className="text-center mb-[45px]">
              <span className="text-gold-crayola uppercase text-label-2 font-bold tracking-ls-3 block mb-[10px]">
                Spice Valley Culinary
              </span>
              <h1 className="font-forum text-display-1 uppercase text-smoky-black-1 tracking-ls-1 leading-[1.1] mb-[12px]">
                Our Delicious Menu
              </h1>
              <p className="text-body-2 text-davys-grey max-w-[620px] mx-auto leading-relaxed">
                Indulge in a curated selection of authentic Indian dishes, traditional mains, and refreshing desserts crafted by our master chefs.
              </p>
            </div>

            {/* 2. Search Menu Box */}
            <div className="relative w-full mb-[50px]">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-quick-silver">
                <IoSearchOutline size={20} />
              </div>
              <input
                type="text"
                placeholder="Search our menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[hsla(0,0%,0%,0.08)] rounded-24 py-[18px] pl-[56px] pr-[24px] text-body-2 text-smoky-black-1 placeholder:text-quick-silver focus:outline-none focus:border-gold-crayola focus:shadow-md transition-all shadow-[0_5px_20px_rgba(0,0%,0%,0.01)]"
              />
            </div>

            {/* 3. Popular Dishes Section (Only when search is empty) */}
            {searchQuery.trim() === '' && (
              <div className="mb-[65px]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[hsla(0,0%,0%,0.06)] pb-[12px] mb-[35px] gap-4">
                  <div>
                    <span className="text-gold-crayola uppercase text-[1.1rem] font-bold tracking-ls-3 block mb-[4px]">
                      CURATED SELECTION
                    </span>
                    <h2 className="font-forum text-headline-2 uppercase tracking-ls-1 font-bold text-smoky-black-1">
                      Popular Dishes
                    </h2>
                  </div>
                  
                  {/* Category filters */}
                  <div className="flex gap-[15px] text-[1.2rem] font-bold uppercase tracking-ls-1">
                    {([
                      { key: 'all', label: 'All' },
                      { key: 'pizza', label: 'Pizza' },
                      { key: 'pasta', label: 'Pasta' },
                      { key: 'starters', label: 'Starters' },
                      { key: 'drinks', label: 'Drinks' }
                    ] as const).map(tab => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setTopCategory(tab.key)}
                        className={`pb-1 transition-all ${
                          topCategory === tab.key
                            ? 'text-gold-crayola border-b border-gold-crayola font-extrabold'
                            : 'text-quick-silver hover:text-smoky-black-1'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular dishes Grid with Framer Motion layout shift and fade animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={topCategory}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[25px]"
                  >
                    {filteredPopular.map(item => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItemId(item.id)}
                        className="bg-white border border-[hsla(0,0%,0%,0.06)] rounded-24 p-[16px] pb-[24px] shadow-[0_6px_25px_rgba(0,0%,0%,0.01)] hover:shadow-md transition-all cursor-pointer flex flex-col group"
                      >
                        {/* Image Frame */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-[20px] bg-[#FAF9F6]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 250px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Hot/Best Seller Badge */}
                          {item.badge && (
                            <span className="absolute top-4 left-4 bg-smoky-black-1 text-gold-crayola text-[1rem] font-bold uppercase tracking-wider px-[8px] py-[4px] rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Content details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2 mb-[6px]">
                              <h3 className="font-forum text-title-3 font-bold uppercase tracking-ls-1 leading-snug group-hover:text-gold-crayola transition-colors">
                                {item.name}
                              </h3>
                              <span className="font-mono text-gold-crayola font-bold text-[1.5rem] leading-none shrink-0 pt-1">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-[4px] text-yellow-500 text-[1.2rem] font-bold">
                              <IoStar />
                              <span className="text-davys-grey">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* 4. Detailed Menu Section */}
            <div>
              {/* Starters / Traditional Mains tab filters (If search is not active) */}
              {searchQuery.trim() === '' && (
                <div className="flex flex-wrap gap-x-[30px] gap-y-[12px] border-b border-[hsla(0,0%,0%,0.06)] pb-[12px] mb-[45px] text-[1.2rem] font-bold uppercase tracking-ls-1">
                  {([
                    { key: 'starters', label: 'Starters' },
                    { key: 'vegan', label: 'Vegan Starters' },
                    { key: 'specials', label: 'Chef\'s Specials' },
                    { key: 'mains', label: 'Traditional Mains' }
                  ] as const).map(tab => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setBottomCategory(tab.key)}
                      className={`pb-1 transition-all ${
                        bottomCategory === tab.key
                          ? 'text-gold-crayola border-b-2 border-gold-crayola font-extrabold'
                          : 'text-quick-silver hover:text-smoky-black-1'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Section title header */}
              <div className="mb-[15px]">
                <h3 className="font-forum text-headline-2 uppercase text-black tracking-ls-1 text-3xl font-bold">
                  {searchQuery.trim() !== ''
                    ? `Search Results for "${searchQuery}"`
                    : bottomCategory === 'starters'
                      ? 'Starters'
                      : bottomCategory === 'vegan'
                        ? 'Vegan Starters'
                        : bottomCategory === 'specials'
                          ? "Chef's Specials"
                          : 'Traditional Mains'}
                </h3>
                <p className="text-body-2 text-davys-grey leading-relaxed max-w-[650px] mt-[6px]">
                  {searchQuery.trim() !== ''
                    ? 'Showing items matching your search query.'
                    : bottomCategory === 'starters'
                      ? 'Our starters are prepared with traditional spices and fresh ingredients. Please let us know if you have any allergies we need to be aware of.'
                      : bottomCategory === 'vegan'
                        ? 'Delicious plant-based starters prepared using authentic spices and fresh herbs.'
                        : bottomCategory === 'specials'
                          ? "Exquisite masterworks crafted specifically by our head chef to elevate your dining experience."
                          : 'Authentic main course options prepared by our master chefs with aromatic spices.'}
                </p>
              </div>

              {/* Starters & Mains List Grid with Framer Motion layout shift and fade animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={searchQuery.trim() !== '' ? 'search-results' : bottomCategory}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px] mt-[35px]"
                >
                  {visibleGridItems.length > 0 ? (
                    visibleGridItems.map(item => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItemId(item.id)}
                        className="bg-white border border-[hsla(0,0%,0%,0.06)] rounded-24 p-[16px] pb-[20px] shadow-[0_6px_25px_rgba(0,0%,0%,0.01)] hover:shadow-md transition-all cursor-pointer flex flex-col group relative"
                      >
                        {/* Image */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-[16px] bg-[#FAF9F6]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 250px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Likes counter indicator (If starters) */}
                          {item.likesCount !== undefined && (
                            <div className="absolute top-3 right-3 bg-white/95 text-smoky-black-1 text-[1.1rem] font-bold px-[8px] py-[4px] rounded-full flex items-center gap-[4px] shadow-sm">
                              <IoHeartOutline className="text-red-500" />
                              <span>{item.likesCount}</span>
                            </div>
                          )}
                          {/* Badge */}
                          {item.badge && (
                            <span className="absolute top-3 left-3 bg-smoky-black-1 text-gold-crayola text-[1rem] font-bold uppercase tracking-wider px-[6px] py-[3px] rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Content details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="mb-[15px]">
                            <h4 className="font-forum text-title-3 font-bold uppercase tracking-ls-1 leading-snug group-hover:text-gold-crayola transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-[1.3rem] text-davys-grey leading-relaxed mt-[8px] line-clamp-2">
                              {item.desc}
                            </p>
                          </div>

                          {/* Price & Add Quick button row */}
                          <div className="flex justify-between items-center pt-[10px] border-t border-[hsla(0,0%,0%,0.04)]">
                            <span className="font-mono text-smoky-black-1 font-bold text-[1.6rem]">
                              ${item.price.toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleQuickAdd(e, item)}
                              className="w-[32px] h-[32px] bg-smoky-black-1 text-white hover:bg-gold-crayola hover:text-smoky-black-1 rounded-md flex items-center justify-center transition-all cursor-pointer"
                              aria-label="Add to cart quick"
                            >
                              <IoAddOutline size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-[40px] text-davys-grey text-[1.4rem]">
                      No items found matching your search.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Show More / Show Less Button for Starters */}
              {bottomCategory === 'starters' && searchQuery.trim() === '' && filteredGrid.length > 4 && (
                <div className="flex justify-center mt-[40px]">
                  <button
                    type="button"
                    onClick={() => setShowAllStarters(prev => !prev)}
                    className="border border-gold-crayola/30 hover:border-gold-crayola hover:bg-gold-crayola/10 text-smoky-black-1 text-[1.2rem] font-bold uppercase tracking-ls-3 px-[30px] py-[14px] rounded-lg transition-all cursor-pointer"
                  >
                    {showAllStarters ? 'Show Less' : 'Show More Starters'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ───────────────── MENU DYNAMIC DETAILS VIEW (MODAL OVERLAY) ───────────────── */}
          <AnimatePresence>
            {selectedItemId && selectedItem && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-[20px]">
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedItemId(null)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="relative w-full max-w-[950px] bg-white border border-[hsla(0,0%,0%,0.06)] rounded-24 shadow-[0_20px_50px_rgba(0,0%,0%,0.15)] overflow-hidden z-10 flex flex-col lg:flex-row items-stretch max-h-[90vh] lg:max-h-[85vh] text-smoky-black-1 font-dmSans"
                >
                  {/* Left Column: Image with back button */}
                  <div className="relative w-full lg:w-[48%] min-h-[200px] sm:min-h-[260px] lg:min-h-full shrink-0 bg-[#FAF9F6]">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                      priority
                    />
                    
                    {/* Back Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedItemId(null)}
                      className="absolute top-4 left-4 bg-white/95 text-smoky-black-1 hover:bg-gold-crayola hover:text-smoky-black-1 flex items-center gap-[6px] px-[12px] py-[8px] rounded-lg text-[1.1rem] font-bold uppercase tracking-ls-1 transition-all shadow-sm cursor-pointer border border-[hsla(0,0%,0%,0.06)]"
                    >
                      <IoArrowBackOutline size={14} />
                      <span>Back</span>
                    </button>
                  </div>

                  {/* Right Column: Menu details, options, quantity and add to cart */}
                  <div className="flex-1 flex flex-col justify-between p-[24px] sm:p-[32px] overflow-y-auto min-h-[300px] lg:min-h-full relative">
                    {/* Top Right Close Icon Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedItemId(null)}
                      className="absolute top-4 right-4 text-quick-silver hover:text-smoky-black-1 p-[8px] bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.04)] rounded-full transition-all cursor-pointer hidden lg:block"
                      aria-label="Close details"
                    >
                      <IoCloseOutline size={20} />
                    </button>

                    <div className="flex flex-col gap-[16px]">
                      <div>
                        {/* Title & Qty Row */}
                        <div className="flex justify-between items-start gap-[20px] mb-[8px]">
                          <h2 className="font-forum text-headline-2 uppercase tracking-ls-1 font-bold text-smoky-black-1 leading-tight max-w-[75%]">
                            {selectedItem.name}
                          </h2>
                          
                          {/* Quantity Counter */}
                          <div className="flex items-center border border-[hsla(0,0%,0%,0.1)] rounded-md overflow-hidden bg-[#FAF9F6] shrink-0">
                            <button
                              type="button"
                              onClick={() => setDetailQty(prev => Math.max(1, prev - 1))}
                              className="p-[6px] hover:bg-gold-crayola/15 text-smoky-black-1 transition-all"
                              aria-label="Decrease quantity"
                            >
                              <IoRemoveOutline size={14} />
                            </button>
                            <span className="px-[12px] font-bold text-[1.3rem] font-mono select-none">
                              {detailQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setDetailQty(prev => prev + 1)}
                              className="p-[6px] hover:bg-gold-crayola/15 text-smoky-black-1 transition-all"
                              aria-label="Increase quantity"
                            >
                              <IoAddOutline size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Rating star review count */}
                        <div className="flex items-center gap-[6px] text-yellow-500 text-[1.2rem] font-bold mb-[18px]">
                          <IoStar />
                          <span className="text-smoky-black-1 font-extrabold">{selectedItem.rating}</span>
                          <span className="text-quick-silver font-medium">({selectedItem.reviewsCount.toLocaleString()} reviews)</span>
                        </div>

                        {/* Description */}
                        <p className="text-[1.3rem] text-davys-grey leading-relaxed mb-[20px] pb-[16px] border-b border-[hsla(0,0%,0%,0.06)]">
                          {selectedItem.desc}
                        </p>

                        {/* Choose Size Selector */}
                        <div>
                          <span className="block text-[1.1rem] font-bold uppercase tracking-ls-2 text-davys-grey mb-[8px]">
                            CHOOSE SIZE
                          </span>
                          <div className="flex gap-[8px]">
                            {(['S', 'M', 'L', 'XL'] as const).map(size => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => setDetailSize(size)}
                                className={`w-[38px] h-[38px] rounded-lg font-bold text-[1.2rem] flex items-center justify-center transition-all ${
                                  detailSize === size
                                    ? 'bg-smoky-black-1 text-white shadow-md'
                                    : 'bg-[#FAF9F6] border border-[hsla(0,0%,0%,0.06)] hover:border-gold-crayola/50'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Checkout Action */}
                    <div className="mt-[24px]">
                      <button
                        type="button"
                        onClick={() => {
                          handleDetailsAdd()
                          setSelectedItemId(null) // Close modal on add to cart
                        }}
                        className="bg-smoky-black-1 text-white hover:text-gold-crayola font-bold uppercase tracking-ls-3 text-label-2 py-[14px] px-[20px] w-full flex justify-between items-center transition-all shadow-md rounded-lg cursor-pointer group"
                      >
                        <div className="flex items-center gap-[10px]">
                          <IoCartOutline size={18} />
                          <span>Add to Cart</span>
                        </div>
                        <span className="font-mono text-gold-crayola group-hover:text-white transition-colors">
                          ${(selectedItem.price * detailQty).toFixed(2)}
                        </span>
                      </button>

                      <span className="block text-[1.1rem] text-quick-silver text-center mt-[10px] font-medium uppercase tracking-wider">
                        Estimated Delivery: {selectedItem.deliveryTime}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <CartDrawer />
          {/* 4. Global sliding cart drawer */}

        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
