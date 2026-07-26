import { Trophy } from 'lucide-react'
import styles from './blocks.module.css'

interface AchievementsBlockProps {
  data: {
    title?: string
    entries: {
      title: string
      issuer?: string
      year?: string
      description?: string
  }[]
  }
}

export function AchievementsBlock({ data }: AchievementsBlockProps) {
  const entries = data.entries || []
  if (entries.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{data.title || 'Achievements'}</h2>
      <div className={styles.achievementsGrid}>
        {entries.map((entry, i) => (
          <div key={i} className={styles.achievementCard}>
            <div className={styles.achievementIcon}>
              <Trophy size={20} />
            </div>
            <div className={styles.achievementContent}>
              <h3 className={styles.achievementTitle}>{entry.title}</h3>
              <div className={styles.achievementMeta}>
                {entry.issuer && <span>{entry.issuer}</span>}
                {entry.issuer && entry.year && <span> · </span>}
                {entry.year && <span>{entry.year}</span>}
              </div>
              {entry.description && (
                <p className={styles.achievementDesc}>{entry.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
