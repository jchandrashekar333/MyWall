'use client'

import React, { useState, useRef } from 'react'
import styles from './blocks.module.css'
import { HeroContent } from '@/types/portfolio'
import { MessageSquare, Share2, Volume2, VolumeX } from 'lucide-react'

export function HeroBlock({ data }: { data: HeroContent }) {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.name,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className={styles.heroWrapper}>
      {/* Banner: video or image, full-width black background */}
      <div className={styles.banner}>
        {data.bannerUrl && data.bannerType === 'video' ? (
          <>
            <video
              ref={videoRef}
              className={styles.bannerMedia}
              src={data.bannerUrl}
              autoPlay
              loop
              muted
              playsInline
            />
            <button 
              className={styles.muteToggleBtn} 
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </>
        ) : data.bannerUrl && data.bannerType === 'image' ? (
          <img className={styles.bannerMedia} src={data.bannerUrl} alt="Banner" />
        ) : (
          <div className={styles.bannerPlaceholder} />
        )}
      </div>

      {/* Profile section below banner */}
      <div className={styles.heroBody}>

        {/* Row 1: photo + name + location */}
        <div className={styles.heroTopRow}>
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.name} className={styles.photo} />
          ) : (
            <div className={styles.photoPlaceholder} />
          )}
          <div className={styles.heroNameBlock}>
            <h1 
              className={`${styles.name} ${data.nameAnimation && data.nameAnimation !== 'none' ? styles[`anim_${data.nameAnimation}`] : ''}`}
              data-text={data.name || 'Your Name'}
            >
              {data.name || 'Your Name'}
            </h1>
            {data.location && (
              <p className={styles.location}>
                {data.location} <span className={styles.locationDot}>🔴</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: role (dark bold font) */}
        {data.role && <p className={styles.role}>{data.role}</p>}

        {/* Row 3: tagline / bio (dark bold text) */}
        {data.tagline && (
          <div 
            className={styles.tagline} 
            dangerouslySetInnerHTML={{ __html: data.tagline }} 
          />
        )}

        {/* Row 4: Action Buttons — Send a message card + Share button */}
        <div className={styles.actionButtonsRow}>
          {data.contactEmail ? (
            <a href={`mailto:${data.contactEmail}`} className={styles.messageCardBtn}>
              <MessageSquare size={18} strokeWidth={2} />
              <span>Send a message</span>
            </a>
          ) : (
            <button type="button" suppressHydrationWarning className={styles.messageCardBtn} onClick={() => alert('No contact email provided')}>
              <MessageSquare size={18} strokeWidth={2} />
              <span>Send a message</span>
            </button>
          )}
          
          <button type="button" suppressHydrationWarning onClick={handleShare} className={styles.shareBtn} title="Share page">
            <Share2 size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  )
}
