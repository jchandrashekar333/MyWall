import styles from './blocks.module.css'
import { Calendar } from 'lucide-react'

export function AvailabilityBlock({ data }: { data: any }) {
  if (!data.url) return null
  return (
    <section className={styles.section} style={{ textAlign: 'center' }}>
      <a href={data.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)', padding: '1rem 2rem', borderRadius: 'var(--border-radius)', fontWeight: 600, fontSize: '1.125rem' }}>
        <Calendar size={20} />
        Book a Meeting
      </a>
    </section>
  )
}
