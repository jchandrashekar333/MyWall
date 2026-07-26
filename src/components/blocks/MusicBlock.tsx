import styles from './blocks.module.css'
import { MusicContent } from '@/types/portfolio'
import { Music } from 'lucide-react'

export function MusicBlock({ data }: { data: MusicContent }) {
  if (!data.song && !data.artist) return null

  // Extract Spotify Track/Playlist/Album ID if possible
  let spotifyEmbedUrl = ''
  let embedHeight = "152"
  
  if (data.spotifyUrl && data.spotifyUrl.includes('spotify.com/')) {
    const match = data.spotifyUrl.match(/(track|playlist|album|artist)\/([a-zA-Z0-9]+)/)
    if (match && match[1] && match[2]) {
      spotifyEmbedUrl = `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator`
      if (match[1] === 'playlist' || match[1] === 'album' || match[1] === 'artist') {
        embedHeight = "352" // Larger height for playlists/albums
      }
    }
  }

  if (data.layout === 'vinyl') {
    return (
      <section className={styles.section}>
        {data.title && <h2 className={styles.sectionTitle}>{data.title}</h2>}
        <div className={styles.vinylContainer}>
          <div className={styles.vinylRecord}></div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 600 }}>{data.song}</h3>
            <p style={{ margin: 0, color: '#aaa', fontSize: '1rem' }}>{data.artist}</p>
            <div className={styles.equalizer}>
              <div className={styles.eqBar}></div>
              <div className={styles.eqBar}></div>
              <div className={styles.eqBar}></div>
              <div className={styles.eqBar}></div>
            </div>
            {data.spotifyUrl && (
              <a 
                href={data.spotifyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-block', marginTop: '1rem', color: '#10b981', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}
              >
                Listen on Spotify →
              </a>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      {data.title && <h2 className={styles.sectionTitle}>{data.title}</h2>}
      <div className={styles.musicCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#10b981', color: 'white', padding: '12px', borderRadius: '50%' }}>
            <Music size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#1e293b' }}>{data.song}</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{data.artist}</p>
          </div>
        </div>
        
        {spotifyEmbedUrl && (
          <iframe 
            style={{ borderRadius: '12px' }} 
            src={spotifyEmbedUrl} 
            width="100%" 
            height={embedHeight}
            frameBorder="0" 
            allowFullScreen={false} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        )}
        
        {data.spotifyUrl && !spotifyEmbedUrl && (
          <a 
            href={data.spotifyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-block', color: '#10b981', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}
          >
            Listen on Spotify →
          </a>
        )}
      </div>
    </section>
  )
}
