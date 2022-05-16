import React, { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string 
  alt: string
  fallBackSrc?: string | StaticImageData
  classStyle: string
  width?: number | string
  height?: number | string
  placeholder?: 'empty' | 'blur'
}

export const ImageWithFallback = ({
  src,
  alt,
  fallBackSrc = '/images/core/default.png',
  classStyle,
  placeholder = 'blur',
}: ImageWithFallbackProps) => {
  //---------------------
  // STATE
  //---------------------
  const [imageError, setImageError] = useState(false)

  //---------------------
  // RENDER
  //---------------------
  return (
    <div style={{ position: 'relative' }} className={classStyle}>
      <Image
        src={imageError || !src ? fallBackSrc : src}
        alt={alt}
        objectFit="cover"
        placeholder={placeholder}
        className={classStyle}
        blurDataURL="/images/core/default.png"
        onError={() => setImageError(true)}
        layout='fill'
      />
    </div>
  )
}
