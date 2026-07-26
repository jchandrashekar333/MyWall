import styles from './blocks.module.css'
import { SkillsContent } from '@/types/portfolio'

export function SkillsBlock({ data }: { data: SkillsContent }) {
  if (!data.tags || data.tags.length === 0) return null

  if (data.layout === 'marquee') {
    return (
      <section className={styles.section} style={{ padding: data.title ? undefined : '1rem 0', overflow: 'hidden' }}>
        {data.title && <h2 className={styles.sectionTitle}>{data.title}</h2>}
        <div className={styles.skillsMarqueeContainer}>
          <div className={styles.skillsMarqueeTrack}>
            {/* Repeat tags multiple times to ensure seamless infinite scroll */}
            {[...data.tags, ...data.tags, ...data.tags, ...data.tags].map((tag, i) => (
              <span key={i} className={styles.marqueeSkillItem}>{tag}</span>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Skills'}</h2>
      <div className={styles.skillsContainer}>
        {data.tags.map((tag, i) => (
          <span key={i} className={styles.skillChip}>{tag}</span>
        ))}
      </div>
    </section>
  )
}
