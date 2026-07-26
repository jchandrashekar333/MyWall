import styles from './blocks.module.css'
import { MoviesContent } from '@/types/portfolio'
import { Film } from 'lucide-react'

export function MoviesBlock({ data }: { data: MoviesContent }) {
  const films = data.favoriteFilms || []
  
  if (films.length === 0 && !data.letterboxdUrl) return null

  return (
    <section className={styles.section}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>{data.title || 'Favorite Films'}</h2>
        {data.letterboxdUrl && (
          <a 
            href={data.letterboxdUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px',
              color: 'white', 
              background: '#00e054', // Letterboxd brand color approx
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <Film size={16} />
            Letterboxd
          </a>
        )}
      </div>

      {films.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '1rem' 
        }}>
          {films.map((film, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ 
                aspectRatio: '2/3', 
                backgroundColor: '#cbd5e1', 
                borderRadius: '8px', 
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>
                {film.imageUrl ? (
                  <img src={film.imageUrl} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                    <Film size={24} />
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {film.title || 'Unknown Film'}
                </div>
                {film.year && (
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{film.year}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
