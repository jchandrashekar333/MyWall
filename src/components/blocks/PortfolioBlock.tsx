import styles from './blocks.module.css'
import { PortfolioContent } from '@/types/portfolio'
import { ExternalLink } from 'lucide-react'

export function PortfolioBlock({ data }: { data: PortfolioContent }) {
  const pieces = data.pieces || []
  if (pieces.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Portfolio'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {pieces.map((piece, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            
            {piece.imageUrl ? (
              <img 
                src={piece.imageUrl} 
                alt={piece.title} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '1px solid #e2e8f0' }} 
              />
            ) : (
              <div style={{ width: '100%', height: '200px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
                No Image Provided
              </div>
            )}
            
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#1e293b' }}>{piece.title}</h3>
              <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>
                {piece.description}
              </p>
              
              {piece.link && (
                <a 
                  href={piece.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#3b82f6', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none', marginTop: 'auto' }}
                >
                  View Work <ExternalLink size={14} />
                </a>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </section>
  )
}
