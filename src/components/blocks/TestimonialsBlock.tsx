'use client'

import React, { useState } from 'react'
import { Quote, Heart, Repeat2, MessageCircle, Share } from 'lucide-react'
import styles from './blocks.module.css'
import { TestimonialsContent } from '@/types/portfolio'

export function TestimonialsBlock({ data }: { data: TestimonialsContent }) {
  const entries = data.entries || []
  const [deckIndex, setDeckIndex] = useState(0)
  
  if (entries.length === 0) return null

  if (data.layout === 'tweet') {
    return (
      <section className={styles.section}>
        {data.title && <h2 className={styles.sectionTitle}>{data.title}</h2>}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {entries.map((entry, i) => {
            const handle = entry.name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 999)
            const fakeLikes = Math.floor(entry.text.length * 3.4)
            const fakeRTs = Math.floor(fakeLikes / 4)
            
            return (
              <div key={i} className={styles.tweetCard}>
                <div className={styles.tweetHeader}>
                  <div className={styles.tweetAvatar}>
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className={styles.tweetNameRow}>
                      {entry.name}
                      <svg viewBox="0 0 24 24" aria-label="Verified account" fill="#1d9bf0" width="18" height="18"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.792-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.733 2.73 1.832 3.43-.053.28-.082.564-.082.86 0 2.21 1.71 4 3.918 4 .542 0 1.058-.106 1.528-.3C9.362 22.455 10.606 23.25 12 23.25s2.638-.795 3.16-2.15c.47.194.986.3 1.528.3 2.21 0 3.918-1.79 3.918-4 0-.296-.029-.58-.082-.86 1.1-.7 1.832-1.97 1.832-3.43z"></path><path fill="#fff" d="M10.15 17.5c-.244 0-.47-.1-.64-.275L6.14 13.84c-.352-.353-.352-.924 0-1.277.353-.352.923-.352 1.276 0l2.73 2.73 6.906-6.91c.352-.352.923-.352 1.276 0 .352.353.352.924 0 1.276l-7.545 7.55c-.17.174-.396.273-.637.273z"></path></g></svg>
                    </div>
                    <div className={styles.tweetHandle}>@{handle} • {entry.role || 'Client'}</div>
                  </div>
                </div>
                <div className={styles.tweetText}>
                  {entry.text}
                </div>
                <div className={styles.tweetMetrics}>
                  <div className={styles.tweetMetric}><MessageCircle size={16} /> {Math.floor(fakeRTs / 3)}</div>
                  <div className={styles.tweetMetric}><Repeat2 size={16} /> {fakeRTs}</div>
                  <div className={styles.tweetMetric}><Heart size={16} /> {fakeLikes}</div>
                  <div className={styles.tweetMetric}><Share size={16} /></div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  if (data.layout === 'cards') {
    const nextCard = () => {
      setDeckIndex((prev) => (prev + 1) % entries.length)
    }
    
    return (
      <section className={styles.section}>
        {data.title && <h2 className={styles.sectionTitle}>{data.title}</h2>}
        <div className={styles.testimonialDeck} onClick={nextCard}>
          {entries.map((entry, i) => {
            // Determine position in stack
            // 0 = top, 1 = middle, 2 = bottom, others = hidden
            let posIndex = (i - deckIndex + entries.length) % entries.length
            
            let posClass = styles.deckCardHidden
            if (posIndex === 0) posClass = styles.deckCardTop
            else if (posIndex === 1) posClass = styles.deckCardMiddle
            else if (posIndex === 2) posClass = styles.deckCardBottom
            
            return (
              <div key={i} className={`${styles.testimonialDeckCard} ${posClass}`}>
                <Quote size={32} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: '#334155' }}>"{entry.text}"</p>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>{entry.name}</h4>
                  {entry.role && <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{entry.role}</p>}
                </div>
              </div>
            )
          })}
        </div>
        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', marginTop: '1rem' }}>Click to view next</p>
      </section>
    )
  }

  // Default Grid
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Testimonials'}</h2>
      <div className={styles.testimonialsGrid}>
        {entries.map((entry, i) => (
          <div key={i} className={styles.testimonialCard}>
            <Quote size={20} className={styles.testimonialQuote} />
            <p className={styles.testimonialText}>{entry.text}</p>
            <div className={styles.testimonialAuthor}>
              <span className={styles.testimonialName}>{entry.name}</span>
              {entry.role && <span className={styles.testimonialRole}>{entry.role}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
