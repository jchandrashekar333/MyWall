import styles from './blocks.module.css'
import { BooksContent } from '@/types/portfolio'
import { BookOpen } from 'lucide-react'

export function BooksBlock({ data }: { data: BooksContent }) {
  if (!data.currentBook) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Currently Reading'}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#fef3c7', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fde68a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#d97706', color: 'white', padding: '12px', borderRadius: '50%' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#92400e' }}>{data.currentBook}</h3>
            <p style={{ margin: 0, color: '#b45309', fontSize: '0.9rem' }}>{data.author}</p>
          </div>
        </div>
        
        {data.readingGoal && (
          <div style={{ background: 'rgba(255, 255, 255, 0.6)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px dashed #d97706', color: '#92400e', fontSize: '0.875rem' }}>
            <strong>Goal:</strong> {data.readingGoal}
          </div>
        )}
      </div>
    </section>
  )
}
