'use client'

import React, { useState } from 'react'
import styles from './blocks.module.css'
import { X } from 'lucide-react'

interface GalleryBlockProps {
  data: {
    title?: string
    layout?: string
    imageFilter?: string
    enableLightbox?: boolean
    hoverCaptions?: boolean
    images: { url: string; caption?: string }[] | string[]
  }
}

export function GalleryBlock({ data }: GalleryBlockProps) {
  const images = (data.images || []).filter((img: any) => img)
  const [lightboxImage, setLightboxImage] = useState<{url: string, caption: string} | null>(null)
  const [activeCoverIndex, setActiveCoverIndex] = useState(Math.floor(images.length / 2))
  
  if (images.length === 0) return null

  const getFilterClass = () => {
    switch(data.imageFilter) {
      case 'grayscale': return styles.filter_grayscale
      case 'sepia': return styles.filter_sepia
      case 'high-contrast': return styles.filter_highContrast
      case 'cyberpunk': return styles.filter_cyberpunk
      default: return ''
    }
  }

  const handleImageClick = (url: string, caption: string) => {
    if (data.enableLightbox !== false) {
      setLightboxImage({ url, caption })
    }
  }

  const renderImageContent = (url: string, caption: string) => (
    <>
      <img src={url} alt={caption || 'Gallery Image'} className={getFilterClass()} />
      {caption && data.hoverCaptions && (
        <div className={styles.hoverCaptionOverlay}>{caption}</div>
      )}
      {caption && !data.hoverCaptions && (
        <div style={{ padding: '0.5rem', color: '#64748b', fontSize: '0.875rem', textAlign: 'center' }}>
          {caption}
        </div>
      )}
    </>
  )

  const renderLayout = () => {
    switch (data.layout) {
      case 'polaroid':
        return (
          <div className={styles.polaroidContainer}>
            <div className={styles.polaroidStack}>
              {images.slice(0, 8).map((img: any, i: number) => {
                const url = typeof img === 'string' ? img : img.url
                const caption = typeof img === 'string' ? '' : img.caption
                if (!url) return null
                return (
                  <div key={i} className={`${styles.polaroidCard} ${getFilterClass()}`} onClick={() => handleImageClick(url, caption)}>
                    <img src={url} alt={`Polaroid ${i + 1}`} />
                    {caption && <div className={styles.polaroidCaption}>{caption}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        )
      
      case 'masonry':
        return (
          <div className={styles.masonryContainer}>
            {images.map((img: any, i: number) => {
              const url = typeof img === 'string' ? img : img.url
              const caption = typeof img === 'string' ? '' : img.caption
              if (!url) return null
              return (
                <div key={i} className={`${styles.masonryItem} ${data.hoverCaptions ? styles.hoverCaptionWrapper : ''}`} onClick={() => handleImageClick(url, caption)}>
                  {renderImageContent(url, caption)}
                </div>
              )
            })}
          </div>
        )

      case 'filmstrip':
        return (
          <div className={styles.filmstripContainer}>
            <div className={styles.filmstripTrack}>
              {/* Duplicate array for seamless infinite scroll */}
              {[...images, ...images].map((img: any, i: number) => {
                const url = typeof img === 'string' ? img : img.url
                const caption = typeof img === 'string' ? '' : img.caption
                if (!url) return null
                return (
                  <div key={i} className={`${styles.filmstripItem} ${data.hoverCaptions ? styles.hoverCaptionWrapper : ''}`} onClick={() => handleImageClick(url, caption)}>
                    {renderImageContent(url, caption)}
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 'coverflow':
        return (
          <div className={styles.coverflowContainer}>
            <div className={styles.coverflowTrack}>
              {images.map((img: any, i: number) => {
                const url = typeof img === 'string' ? img : img.url
                const caption = typeof img === 'string' ? '' : img.caption
                if (!url) return null
                
                const offset = i - activeCoverIndex
                const absOffset = Math.abs(offset)
                const zIndex = 100 - absOffset
                const scale = absOffset === 0 ? 1 : Math.max(0.6, 1 - absOffset * 0.15)
                const translateX = offset * 120
                const rotateY = offset === 0 ? 0 : offset > 0 ? -45 : 45
                const opacity = absOffset > 2 ? 0 : 1

                return (
                  <div 
                    key={i} 
                    className={`${styles.coverflowItem} ${data.hoverCaptions ? styles.hoverCaptionWrapper : ''}`}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${-absOffset * 100}px) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                      pointerEvents: opacity === 0 ? 'none' : 'auto'
                    }}
                    onClick={() => {
                      if (offset === 0) handleImageClick(url, caption)
                      else setActiveCoverIndex(i)
                    }}
                  >
                    {renderImageContent(url, caption)}
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 'bento':
        return (
          <div className={styles.bentoContainer}>
            {images.slice(0, 6).map((img: any, i: number) => {
              const url = typeof img === 'string' ? img : img.url
              const caption = typeof img === 'string' ? '' : img.caption
              if (!url) return null
              return (
                <div key={i} className={`${styles.bentoItem} ${data.hoverCaptions ? styles.hoverCaptionWrapper : ''}`} onClick={() => handleImageClick(url, caption)}>
                  {renderImageContent(url, caption)}
                </div>
              )
            })}
          </div>
        )

      case 'carousel':
        return (
          <div className={styles.carouselContainer}>
            {images.map((img: any, i: number) => {
              const url = typeof img === 'string' ? img : img.url
              const caption = typeof img === 'string' ? '' : img.caption
              if (!url) return null
              return (
                <div key={i} className={`${styles.carouselItem} ${data.hoverCaptions ? styles.hoverCaptionWrapper : ''}`} onClick={() => handleImageClick(url, caption)}>
                  {renderImageContent(url, caption)}
                </div>
              )
            })}
          </div>
        )

      case 'scrapbook':
        return (
          <div className={styles.scrapbookContainer}>
            {images.map((img: any, i: number) => {
              const url = typeof img === 'string' ? img : img.url
              const caption = typeof img === 'string' ? '' : img.caption
              if (!url) return null
              return (
                <div key={i} className={styles.scrapbookItem} onClick={() => handleImageClick(url, caption)}>
                  <img src={url} alt={`Scrapbook ${i + 1}`} className={getFilterClass()} />
                  {caption && (
                    <div style={{ marginTop: '10px', textAlign: 'center', fontFamily: '"Comic Sans MS", cursive', color: '#333' }}>
                      {caption}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )

      case 'grid':
      default:
        return (
          <div className={styles.galleryGrid}>
            {images.map((img: any, i: number) => {
              const url = typeof img === 'string' ? img : img.url
              const caption = typeof img === 'string' ? '' : img.caption
              if (!url) return null
              return (
                <div key={i} className={`${styles.galleryItem} ${data.hoverCaptions ? styles.hoverCaptionWrapper : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: 'hidden' }} onClick={() => handleImageClick(url, caption)}>
                  <img src={url} alt={`Gallery image ${i + 1}`} className={`${styles.galleryImage} ${getFilterClass()}`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                  {caption && data.hoverCaptions && (
                    <div className={styles.hoverCaptionOverlay}>{caption}</div>
                  )}
                  {caption && !data.hoverCaptions && (
                    <div style={{ padding: '0.25rem 0.5rem', color: '#64748b', fontSize: '0.875rem', textAlign: 'center' }}>
                      {caption}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
    }
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Gallery'}</h2>
      {renderLayout()}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxImage(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxImage(null)}>
            <X size={32} />
          </button>
          <img src={lightboxImage.url} alt="Lightbox" className={styles.lightboxImage} onClick={e => e.stopPropagation()} />
          {lightboxImage.caption && <div className={styles.lightboxCaption}>{lightboxImage.caption}</div>}
        </div>
      )}
    </section>
  )
}
