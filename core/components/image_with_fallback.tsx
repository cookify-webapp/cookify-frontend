import React, { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallBackSrc?: string | StaticImageData
  classStyle: string
  width?: number
  height?: number
  placeholder?: 'empty' | 'blur'
}

export const ImageWithFallback = ({
  src,
  alt,
  fallBackSrc = '/images/core/default.png',
  classStyle,
  width,
  height,
  placeholder = 'blur',
}: ImageWithFallbackProps) => {
  //---------------------
  // STATE
  //---------------------
  const [imageError, setImageError] = useState(false)
  const [imageIsLoaded, setImageIsLoaded] = useState(false)
  //---------------------
  // RENDER
  //---------------------
  return (
    <div style={{ position: 'relative' }}>
      <Image
        src={imageError || !src ? fallBackSrc : src}
        alt={alt}
        objectFit="cover"
        width={500 || width}
        height={500 || height}
        placeholder={placeholder}
        className={`transition-all duration-150 ${classStyle} ${imageIsLoaded ? 'animate-pulse' : ''}`}
        onLoad={() => setImageIsLoaded(true)}
        onLoadingComplete={() => setImageIsLoaded(false)}
        blurDataURL="/images/core/default.png"
        onError={() => setImageError(true)}
      />
    </div>
  )
}
