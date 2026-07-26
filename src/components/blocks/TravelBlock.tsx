import styles from './blocks.module.css'
import { TravelContent } from '@/types/portfolio'
import { Plane, MapPin } from 'lucide-react'

export function TravelBlock({ data }: { data: TravelContent }) {
  const places = data.places || []
  const photos = data.photos || []

  if (places.length === 0 && photos.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Travel & Adventures'}</h2>
      <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bae6fd' }}>
        
        {places.length > 0 && (
          <div style={{ marginBottom: photos.length > 0 ? '1.5rem' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#0284c7', fontWeight: 600 }}>
              <Plane size={20} />
              <span>Places Visited</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {places.map((place, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'white', padding: '6px 12px', borderRadius: '9999px', fontSize: '0.875rem', color: '#0369a1', border: '1px solid #e0f2fe' }}>
                  <MapPin size={14} />
                  {place}
                </div>
              ))}
            </div>
          </div>
        )}

        {photos.length > 0 && (
          <div className={styles.galleryGrid} style={{ marginTop: '1rem' }}>
            {photos.map((photo, i) => (
              <div key={i} className={styles.galleryItem}>
                <img src={photo} alt={`Travel photo ${i + 1}`} className={styles.galleryImage} style={{ borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
