import React from 'react'
import Image from 'next/image'

interface SectionSubtitleProps {
  children: React.ReactNode
  className?: string
  align?: 'center' | 'left'
}

export default function SectionSubtitle({ children, className = '', align = 'center' }: SectionSubtitleProps) {
  const isLeft = align === 'left'

  return (
    <div className={`flex flex-col select-none ${isLeft ? 'items-start text-left' : 'items-center text-center'} ${className}`}>
      <span className="text-gold-crayola font-bold text-label-2 uppercase tracking-ls-2">
        {children}
      </span>
      <div className={`relative w-[100px] h-[15px] mt-[10px] mb-[15px] flex items-center ${isLeft ? 'justify-start' : 'justify-center'}`}>
        <Image 
          src="/assets/images/separator.svg" 
          alt="Separator" 
          width={100} 
          height={15} 
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </div>
  )
}
