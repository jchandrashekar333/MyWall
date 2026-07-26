'use client'

import React, { useRef, useState, MouseEvent as ReactMouseEvent } from 'react'
import { ExternalLink } from 'lucide-react'
import { 
  FaXTwitter, FaGithub, FaLinkedinIn, FaInstagram, FaYoutube, FaFacebookF, FaTiktok, FaTwitch,
  FaSnapchat, FaPinterestP, FaSpotify, FaDiscord, FaMedium, FaDribbble, FaBehance
} from 'react-icons/fa6'
import styles from './blocks.module.css'
import { LinksContent } from '@/types/portfolio'

export function LinksBlock({ data }: { data: LinksContent }) {
  const links = data.links || []
  if (links.length === 0) return null

  const getIconForUrl = (url: string) => {
    try {
      const lowerUrl = url.toLowerCase()
      if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return FaXTwitter
      if (lowerUrl.includes('github.com')) return FaGithub
      if (lowerUrl.includes('linkedin.com')) return FaLinkedinIn
      if (lowerUrl.includes('instagram.com')) return FaInstagram
      if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return FaYoutube
      if (lowerUrl.includes('facebook.com')) return FaFacebookF
      if (lowerUrl.includes('tiktok.com')) return FaTiktok
      if (lowerUrl.includes('twitch.tv')) return FaTwitch
      if (lowerUrl.includes('snapchat.com')) return FaSnapchat
      if (lowerUrl.includes('pinterest.com')) return FaPinterestP
      if (lowerUrl.includes('spotify.com')) return FaSpotify
      if (lowerUrl.includes('discord.com') || lowerUrl.includes('discord.gg')) return FaDiscord
      if (lowerUrl.includes('medium.com')) return FaMedium
      if (lowerUrl.includes('dribbble.com')) return FaDribbble
      if (lowerUrl.includes('behance.net')) return FaBehance
    } catch (e) {}
    return ExternalLink
  }

  const renderBadge = (badgeType?: string) => {
    if (!badgeType || badgeType === 'none') return null
    if (badgeType === 'new') return <div className={styles.linkBadge}>NEW</div>
    if (badgeType === 'dot') return <div className={`${styles.linkBadge} ${styles.badge_dot}`}></div>
    if (badgeType === 'hot') return <div className={`${styles.linkBadge} ${styles.badge_hot}`}>🔥</div>
    if (badgeType === 'star') return <div className={`${styles.linkBadge} ${styles.badge_star}`}>⭐</div>
    return null
  }

  return (
    <section className={styles.section} style={{ padding: data.title ? undefined : '0.5rem 1.25rem' }}>
      {data.title && <h2 className={styles.sectionTitle}>{data.title}</h2>}
      <div className={styles.linksGrid}>
        {links.map((link, i) => {
          const Icon = getIconForUrl(link.url)
          return (
            <LinkItem 
              key={i} 
              link={link} 
              Icon={Icon} 
              layout={data.layout} 
              linkStyle={data.linkStyle}
              linkAnimation={data.linkAnimation}
              badge={renderBadge(link.badge)} 
            />
          )
        })}
      </div>
    </section>
  )
}

function LinkItem({ link, Icon, layout, linkStyle, linkAnimation, badge }: { link: any, Icon: any, layout?: string, linkStyle?: string, linkAnimation?: string, badge: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (layout === 'magnetic' && ref.current) {
      const { left, top, width, height } = ref.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const mouseX = e.clientX
      const mouseY = e.clientY
      // pull towards mouse max 15px
      const pullX = ((mouseX - centerX) / width) * 30
      const pullY = ((mouseY - centerY) / height) * 30
      setPosition({ x: pullX, y: pullY })
    }
  }

  const handleMouseLeave = () => {
    if (layout === 'magnetic') {
      setPosition({ x: 0, y: 0 })
    }
  }

  let classNames = styles.linkCard
  
  // Layout class
  if (layout === 'spotlight') classNames += ` ${styles.spotlightBtn}`
  if (layout === 'magnetic') classNames += ` ${styles.magneticBtn}`

  // Style class
  if (linkStyle === 'outline') classNames += ` ${styles.linkStyle_outline}`
  else if (linkStyle === 'gradient') classNames += ` ${styles.linkStyle_gradient}`
  else if (linkStyle === 'neo') classNames += ` ${styles.linkStyle_neo}`
  else if (linkStyle === 'glass') classNames += ` ${styles.linkStyle_glass}`
  else classNames += ` ${styles.linkStyle_solid}`

  // Animation class
  if (linkAnimation === 'bounce') classNames += ` ${styles.linkAnim_bounce}`
  else if (linkAnimation === 'wiggle') classNames += ` ${styles.linkAnim_wiggle}`
  else if (linkAnimation === 'glow') classNames += ` ${styles.linkAnim_glow}`
  else if (linkAnimation !== 'none') classNames += ` ${styles.linkAnim_lift}`

  return (
    <a
      ref={ref}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        position: 'relative', 
        justifyContent: 'center',
        transform: layout === 'magnetic' ? `translate(${position.x}px, ${position.y}px)` : undefined,
      }}
    >
      {badge}
      <div style={{ position: 'absolute', left: '1.25rem', display: 'flex', alignItems: 'center' }}>
        <Icon size={20} className={styles.linkIcon} />
      </div>
      <div className={styles.linkCardContent} style={{ alignItems: 'center', textAlign: 'center' }}>
        <span className={styles.linkLabel}>{link.label}</span>
        {link.description && (
          <span className={styles.linkDescription}>{link.description}</span>
        )}
      </div>
    </a>
  )
}
